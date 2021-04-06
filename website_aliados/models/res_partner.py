# -*- coding: utf-8 -*-

from odoo import _, api, fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    pop_up_description = fields.Text(string='Descripcion para el marcador')
    l_latitude = fields.Float(string='Latitud', digits=(
        18, 15), default=4.570868)
    l_longitude = fields.Float(string='Longitud', digits=(
        18, 15), default=-74.297333)
    marker_icon = fields.Image("Icono Marcador", max_width=50, max_height=50)
    image_popup_1920 = fields.Image("Image Popup", max_width=1920, max_height=1920)
    # resized fields stored (as attachment) for performance
    image_popup_1024 = fields.Image(
        "Image Popup 1024", related="image_popup_1920", max_width=1024, max_height=1024, store=True)
    image_popup_512 = fields.Image(
        "Image Popup 512", related="image_popup_1920", max_width=512, max_height=512, store=True)
    image_popup_256 = fields.Image(
        "Image Popup 256", related="image_popup_1920", max_width=256, max_height=256, store=True)
    image_popup_128 = fields.Image(
        "Image Popup 128", related="image_popup_1920", max_width=128, max_height=128, store=True)
