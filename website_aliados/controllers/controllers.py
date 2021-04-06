# -*- coding: utf-8 -*-
import random
from odoo import http
from odoo.http import request


class WebsiteAliados(http.Controller):

    def _getAddress(self, o):
        return '%s, %s %s, %s' % (o.street or '', o.city or '', o.zip or '',
                                  o.country_id and o.country_id.display_name or '')

    @http.route(['/aliados/mapa'], type='http', auth="public", website=True)
    def partners_detail(self, **post):
        return request.render("website_aliados.aliados", {})

    @http.route('/website_aliados/aliados/', type='json', auth='public')
    def index(self, **kw):
        aliados = request.env['res.partner'].sudo().search(
            [['is_published', '=', True]], order='display_name asc')
        data = []
        for aliado in aliados:
            data.append({
                'categories': sorted([{'id': cat.id, 'title': cat.display_name} for cat in aliado.category_id], key=lambda c: c.get('title')),
                'address': self._getAddress(aliado),
                'website': aliado.website,
                'phone': aliado.phone,
                'email': aliado.email,
                'icon': '/website/image/res.partner/%d/marker_icon' % (aliado.id) if aliado.marker_icon else False,
                'coords': (aliado.l_latitude, aliado.l_longitude), # +random.uniform(-3, 3)
                'description': aliado.pop_up_description,
                'city': {'id': aliado.city, 'title': aliado.city},
                'image': '/website/image/res.partner/%d/image_popup_512' % (aliado.id) if aliado.image_popup_512 else '/website/image/res.partner/%d/image_512' % (aliado.id),
                'title': aliado.display_name,
                'id': aliado.id
            })
        return data
