<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Extract the values from the POST data
$fullName = $_POST['fullName'];
$orgName = $_POST['orgName'];
$street = $_POST['street'];
$zipcode = $_POST['zipcode'];
$city = $_POST['city'];
$country = $_POST['country'];
$contactEmail = $_POST['contactEmail'];
$contactPhone = $_POST['contactPhone'];
$contactFax = $_POST['contactFax'] ?? "undefined";
$subdomain = $_POST['subdomain'];
$reason = $_POST['reason'];
$configInfo = $_POST['configInfo'];


// Compose the email
$to = '';
$subject = 'New Contact Form Submission';
$body = "Full Name: $fullName\nOrganization Name: $orgName\nStreet: $street\nZipcode: $zipcode\nCity: $city\nCountry: $country\nContact Email: $contactEmail\nContact Phone: $contactPhone\nContact Fax: $contactFax\nSubdomain: $subdomain\nReason: $reason\nConfig Info: $configInfo";

// Set up the SMTP server configuration
$smtpHost = '';
$smtpPort = 465;
$smtpUsername = '';
$smtpPassword = '';

try {
    // Create a new PHPMailer instance
    $mail = new PHPMailer;

    // Set up SMTP
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl'; // Enable SSL encryption
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;

    // Set up email content
    $mail->setFrom($contactEmail, $fullName);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $body;

    // Send the email
    if ($mail->send()) {
        http_response_code(200); // Success
        echo 'Email sent successfully!';
    } else {
        http_response_code(500); // Internal Server Error
        echo 'Error sending email: ' . $mail->ErrorInfo;
        // Log the error to a file
        error_log('Error sending email: ' . $mail->ErrorInfo, 3, 'errors/error.log');
    }
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo 'Exception caught: ' . $e->getMessage();
    // Log the exception to a file
    error_log('Exception caught: ' . $e->getMessage(), 3, 'errors/error.log');
}
