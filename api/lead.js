/**
 * ============================================================
 * api/lead.js — função serverless (Vercel)
 * ============================================================
 * Recebe o lead do formulário da bio (POST JSON do front) e o
 * repassa ao webhook do n8n com o segredo no header, do lado do
 * servidor. Assim o segredo nunca aparece no código público.
 *
 * O n8n (fluxo magnus-lead-site) grava em magnus_app.leads e
 * envia o e-mail de aviso para contato@magnusmidias.com.
 * Esta função responde rápido e não bloqueia o visitante: o
 * front abre o WhatsApp em paralelo.
 *
 * Variáveis de ambiente (configuradas na Vercel):
 *   N8N_WEBHOOK_URL     → https://<n8n>/webhook/magnus-lead
 *   N8N_WEBHOOK_SECRET  → segredo compartilhado (x-webhook-secret)
 *
 * REGRA: o secret é EXCLUSIVO deste site. Nunca reusar o de
 * outro site (o bio-cristian tem o dele), porque um secret
 * vazado derrubaria os dois de uma vez.
 * ============================================================
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  var url = process.env.N8N_WEBHOOK_URL;
  var secret = process.env.N8N_WEBHOOK_SECRET;

  // Sem config, não quebra o fluxo do visitante: só não grava.
  if (!url) {
    return res.status(200).json({ ok: false, error: 'not_configured' });
  }

  try {
    var body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    body = body || {};

    // Validação mínima: nome, e-mail e telefone.
    if (!body.nome || !body.email || !body.telefone) {
      return res.status(400).json({ ok: false, error: 'missing_fields' });
    }

    var resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret || '',
      },
      body: JSON.stringify({
        origem:    'magnus-linkbio',
        nome:      String(body.nome).slice(0, 200),
        empresa:   String(body.empresa || '').slice(0, 200),
        email:     String(body.email).slice(0, 200),
        telefone:  String(body.telefone).slice(0, 60),
        interesse: String(body.interesse || '').slice(0, 300),
        mensagem:  String(body.mensagem || '').slice(0, 2000),
        locale:    body.locale === 'en' ? 'en' : 'pt',
        pagina:    String(body.pagina || '').slice(0, 500),
        utm:       body.utm && typeof body.utm === 'object' ? body.utm : {},
        recebido_em: new Date().toISOString(),
      }),
    });

    return res.status(200).json({ ok: resp.ok });
  } catch (err) {
    // Não expõe o erro ao cliente; o lead ainda vai ao WhatsApp.
    return res.status(200).json({ ok: false, error: 'forward_failed' });
  }
}
