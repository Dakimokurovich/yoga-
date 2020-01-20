<?php
    $mail = filter_var(trim($_POST['mail']), FILTER_SANITIZE_STRING);//filter_var - фильтрует html-частици и все остальное
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);//trim - удаляет лишние символы/знаки, пробелы, FILTER_SANITIZE_STRING - метод очистки
    // $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);
    //Методом POST поля name присваиваем в переменную $name 


    $mysql = new mysqli('localhost', 'mysql', 'mysql', 'ivan');//хост, логин, пароль, название базы данных
    $mysql->query("INSERT INTO feedback (phone, mail) VALUES('$phone', '$mail')");//reg - таблица, в login... присваиваем все из переменных login...
    $mysql->close;//Отключаемся от базы данных
    
     header('Location: http://yoga-/');//Возвращаемся на главную страницу
?>