# Whatodo: Django Todo List

Whatodo is a super awesome web todo list application build with Django, Django Rest Framework. 

## Structure

```
├── README.md  Project discription
├── .env.example Dot-env example
├── frontend  Site Frontend
├── manage.py  Django Manage
├── requirements.pip  Python dependency
├── items  todo items API module
│   ├── views.py  API view
│   ├── serializers.py API arguments check
│	└── ... Other files
├── account  User account management app
│   ├── authentication.py  Session authentication module
│   ├── validators.py  API arguments check
│   └── ... Other files
└── whatodo  Project configuration
    ├── settings.py  Common configuration
    ├── urls.py  Root URL router
    ├── wsgi.py  WSGI support
```

## Features

### Different accounts supported

![](https://cl.ly/3R0b1T211h1m/Screen%20recording%202017-08-07%20at%2004.14.37%20PM.gif)

### Todos management

create, edit amazing todos with different urgency.

![](https://cl.ly/3v0w3J231M00/Screen%20recording%202017-08-07%20at%2003.48.12%20PM.gif)

sort them or use the filter to find what you want.

![](https://cl.ly/2K123c2R083D/Screen%20recording%202017-08-07%20at%2003.57.46%20PM.gif)

check or delete them as you like.

Have a look at how many things you have ever completed.

![](https://cl.ly/0M2h2o2h2g1X/Screen%20recording%202017-08-07%20at%2004.05.46%20PM.gif)

