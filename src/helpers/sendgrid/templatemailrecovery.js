const getTemplete = (mensaje) => {
  const currentYear = new Date().getFullYear();

  return `
 <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Correo CADEGRAN</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
      }
      .header {
        background-color: #dfe4e9f0;
        padding: 20px;
        color: #ffffff;
        text-align: center;
      }
      .header img {
        max-width: 200px;
        margin-bottom: 10px;
      }
      .contact-info {
        font-size: 14px;
        margin-top: 10px;
        color:#1255cc;
      }
      .title {
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        margin-top: 30px;
        color: #1e1e1e;
      }
      .subtitle {
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 30px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #dfe4e9f0;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        text-align: center;
        margin: 20px auto;
      }
      .benefits {
        padding: 0 20px;
        font-size: 14px;
        line-height: 1.6;
      }
      .benefit-item {
        margin-bottom: 16px;
      }
      .footer {
        font-size: 12px;
        text-align: center;
        color: #888;
        margin-top: 40px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header con logo y contacto -->
      <div class="header">
        <img
          src="https://cadegran.com.co/wp-content/uploads/2024/08/logo-1.png"
          alt="Logo CADEGRAN"
        />
        <div class="contact-info">
          <strong>Llámanos:</strong> +57 (2) 244 4563<br />  
          <strong>Llámanos:</strong> +57 317 644 1160<br />
          <strong>Email:</strong> cadegranltda@cadegran.com
        </div>
      </div>

      <!-- Contenido principal -->
      
      <div class="subtitle">
         ${mensaje}
      </div>

      <div style="text-align: center">
        <a href="https://cadegran.com.co/contact-4/" class="button"
          >CONTACTOS</a
        >
      </div>

      <!-- Beneficios -->
      <div class="benefits">
        <div class="benefit-item">
          ✅ <strong>Gerente</strong> LUIS ENRIQUE GRILLO BAUTISTA :
          luisegrillo@cadegran.com
        </div>
        <div class="benefit-item">
          ✅ <strong>Director Marítimo</strong> LEONARDO E. GRILLO PAEZ :
          leonardogrillo@cadegran.com
        </div>
        <div class="benefit-item">
          ✅ <strong>Director Transporte</strong> DIEGO A. GRILLO PAEZ :
          cadegranbodega@cadegran.com
        </div>
        <div class="benefit-item">
          ✅ <strong>Directora Administrativa</strong> MIRTHA L. RIOFRIO :
          lorenariofrio@cadegran.com
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        © ${currentYear} CADEGRAN LTDA. Todos los derechos reservados.
      </div>
    </div>
  </body>
</html>
`;
};

module.exports = {
  getTemplete,
};
