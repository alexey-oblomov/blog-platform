# Блог-платформа

## Demo

Демонстрация: https://alexey-oblomov.github.io/blog-platform

## Описание задачи

Реализация типичной CRUD (create-read-update-delete) задачи на примере статей.

Описание функционала:

    Необходимо реализовать список статей с пагинацией (переключение страниц) по 9 статей на страницу. Страницу статьи, создание и редактирование статьи, удаление статьи (для владельца), лайки для статей, просмотр страницы автора любой статьи и вывод всех его статей.

Cтраницы:

    / список всех статей. Выводится заголовок заметки, имя автора, дата в формате "создана N дней/часов/минут назад", список тегов и количество лайков. Можно поставить лайк или убрать. При клике на блок - переход на страницу статьи.
    /add - страница создания новой статьи. Заполняем поля заголовка, короткого описания, содержимого и тегов. Только для залогинных пользователей.
    /articles/{slug} - Просмотр статьи с полным текстом и метаинформация (даты, автор, теги и т.п.). Возможность лайка/отмены лайка.
    /articles/{slug}/edit - Редактирование статьи. Только для залогинных пользователей.
    /user/{slug} - страница автора статьи.

Особенности:

    После перезагрузки приложения логин должен сохраняться.
    Удалять статью можно из общего списка, из режима просмотра статьи и режима редактирования статьи.
    Список статей должен быть доступен незалогиненным пользователям.
    url сервера и метод аутентификации должно быть легко сменить.
    Пагинация должна быть по всем (см articlesCount) статьям.

Используемые инструменты:

    redux - стейт-менеджер
    date-fns - библиотека для работы с датами, более современный аналог moment.js
    react-router - навигация по приложению
    material-ui - библиотека React-компонентов

API:

    Корневой URL для API: <a href="https://conduit.productionready.io/api/">https://conduit.productionready.io/api/</a>
    Документация по апи: <a href="https://github.com/gothinkster/realworld/tree/master/api">Здесь</a>