<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $review = htmlspecialchars($_POST['review']);
    $rating = intval($_POST['rating']);

    // Formatowanie opinii
    $reviewEntry = "Name: $name\nReview: $review\nRating: " . str_repeat('★', $rating) . str_repeat('☆', 5 - $rating) . "\n\n";

    // Zapis do pliku
    $file = 'reviews.txt';
    if (file_put_contents($file, $reviewEntry, FILE_APPEND | LOCK_EX)) {
        echo "Dziękujemy za opinię!";
    } else {
        echo "Nie udało się zapisać opinii.";
    }
} else {
    echo "Nieprawidłowe żądanie.";
}
?>
