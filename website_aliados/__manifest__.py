# -*- coding: utf-8 -*-
{
    'name': "website_aliados",

    'summary': """
        Pagina de Aliados Cocrear""",

    'description': """
        Este modulo esta pre destinado y diseñado para crear una pagina
        que posibilita ver los aliados de cocrear desde un mapa interactivo.
    """,
    'author': "Beto Martinez, Ilusoria S.A.S.",
    'website': "https://www.ilusoria.com.co",
    'category': 'Website/Website',
    'version': '1.0',
    'depends': ['base', 'website', 'leafletjs'],
    'data': [
        'data/website_page_menu.xml',
        'views/res.partner.xml',
        'views/website_aliados.xml',
        'views/templates.xml',
    ],
}
