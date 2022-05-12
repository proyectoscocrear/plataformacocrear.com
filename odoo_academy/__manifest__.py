# -*- coding: utf-8 -*-

{
    'name':'Odoo Academy',
    
    'sumary': """Academy app to manage Training """,
    
    'description':"""
        Academy module to manage training:
        -courses
        -sessions
        -attendees    
    """,
    
    'author': 'Odoo',
    
    'website':'https://www.odoo.com',
    
    'category':'training',
    'version':'0.1',
    
    'depends':['base'],
    
    'data':[
        'security/academy_security.xml',
        'security/ir.model.access.csv',
        'views/academy_menuitems.xml',
        'views/course_views.xml',
    ],
    
    'demo':[
        'demo/academy_demo.xml',
    ],
}