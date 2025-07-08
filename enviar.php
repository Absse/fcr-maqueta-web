<?php
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';
require 'includes/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Captura los campos del formulario
$nombre    = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$apellido  = isset($_POST['apellido']) ? trim($_POST['apellido']) : '';
$email     = isset($_POST['email']) ? trim($_POST['email']) : '';
$compania  = isset($_POST['compania']) ? trim($_POST['compania']) : '';
$mensaje   = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';
$lang      = isset($_POST['lang']) ? $_POST['lang'] : 'es';

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP de BlueHosting
    $mail->isSMTP();
    $mail->Host       = 'mail.fcrconsultores.cl';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-reply@fcrconsultores.cl';
    $mail->Password   = 'Pwcwelcome1!'; // ← reemplaza por tu contraseña real
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Usa ssl para 465
    $mail->Port       = 465; // Puerto recomendado por BlueHosting

    // Remitente y destinatario
    $mail->setFrom('no-reply@fcrconsultores.cl', 'FCR Consultores');
    $mail->addAddress('no-reply@fcrconsultores.cl'); // ← pon aquí el correo del cliente real
    $mail->addReplyTo($email, $nombre . ' ' . $apellido);

    // Contenido
    $mail->CharSet = 'UTF-8';
    $mail->isHTML(false);
    $mail->Subject = "Nuevo mensaje de contacto - FCR Consultores";
    $mail->Body    = "Nombre: $nombre $apellido\n"
                   . "Email: $email\n"
                   . "Compañía: $compania\n"
                   . "Mensaje:\n$mensaje\n";

    $mail->send();

    // Redirección multilenguaje
    if ($lang === 'en') {
        header("Location: /en/gracias.html");
    } else if ($lang === 'pt') {
        header("Location: /pt/gracias.html");
    } else {
        header("Location: /gracias.html");
    }
    exit;
} catch (Exception $e) {
    // Redirección a error
    if ($lang === 'en') {
        header("Location: /en/error.html");
    } else if ($lang === 'pt') {
        header("Location: /pt/error.html");
    } else {
        header("Location: /error.html");
    }
    exit;
}
?>
