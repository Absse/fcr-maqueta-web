<?php
// 1. Recibe datos del formulario (los IDs de tus input deben coincidir)
$nombre    = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$apellido  = isset($_POST['apellido']) ? trim($_POST['apellido']) : '';
$email     = isset($_POST['email']) ? trim($_POST['email']) : '';
$compania  = isset($_POST['compania']) ? trim($_POST['compania']) : '';
$mensaje   = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';
$lang      = isset($_POST['lang']) ? $_POST['lang'] : 'es'; // valor por defecto

// 2. Destinatarios (puedes poner varios separados por coma)
$to = 'cba.gs@hotmail.com'; // cambia por tu correo real
$subject = "Nuevo mensaje de contacto - FCR Consultores";

// 3. Arma el cuerpo del mensaje
$body = "Nombre: $nombre $apellido\n";
$body .= "Email: $email\n";
$body .= "Compañía: $compania\n";
$body .= "Mensaje:\n$mensaje\n";

// Cabeceras
$headers = "From: $email\r\n" .
           "Reply-To: $email\r\n";

// 4. Intenta enviar el correo
if (mail($to, $subject, $body, $headers)) {
    // Éxito: Redirige al "gracias" correcto
    if ($lang === 'en') {
        header("Location: /en/thankyou.html");
    } else if ($lang === 'pt') {
        header("Location: /pt/obrigado.html");
    } else {
        header("Location: /gracias.html");
    }
    exit;
} else {
    // Error: Redirige al error correcto
    if ($lang === 'en') {
        header("Location: /en/error.html");
    } else if ($lang === 'pt') {
        header("Location: /pt/erro.html");
    } else {
        header("Location: /error.html");
    }
    exit;
}
?>
