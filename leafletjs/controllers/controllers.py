# -*- coding: utf-8 -*-
# from odoo import http


# class Leafletjs(http.Controller):
#     @http.route('/leafletjs/leafletjs/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/leafletjs/leafletjs/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('leafletjs.listing', {
#             'root': '/leafletjs/leafletjs',
#             'objects': http.request.env['leafletjs.leafletjs'].search([]),
#         })

#     @http.route('/leafletjs/leafletjs/objects/<model("leafletjs.leafletjs"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('leafletjs.object', {
#             'object': obj
#         })
