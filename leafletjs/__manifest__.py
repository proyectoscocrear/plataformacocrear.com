
{
    'name': "leafletjs",

    'summary': """
        Extension that integrates leafletjs into odoo""",

    'description': """
        This Extension can be used as complement by other models
        the main objective is to integrate a dynamic map everywhere
    """,

    'author': "Beto Martinez, Ilusoria SAS",
    'website': "https://www.ilusoria.com.co",

    'category': 'Website/Website',
    'version': '1.0',

    'depends': ['base', 'website'],

    'data': ['views/map.xml'],
    'demo': [
    ],
}
