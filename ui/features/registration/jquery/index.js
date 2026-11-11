/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import $ from 'jquery'
import preventDefault from '@canvas/util/preventDefault'
import {loadSignupDialog} from '@canvas/signup-dialog'
import htmlEscape from '@instructure/html-escape'
import {useScope as createI18nScope} from '@canvas/i18n'
import extensions from '@canvas/bundles/extensions'

const I18n = createI18nScope('registration')

$('.signup_link').click(
  preventDefault(function () {
    loadSignupDialog
      .then(signupDialog => {
        signupDialog($(this).data('template'), $(this).prop('title'), $(this).data('path'))
      })
      .catch(error => {
        throw new Error('Error loading signup dialog: ', error)
      })
  }),
)

$('#registration_video a').click(
  preventDefault(function () {
    // xsslint safeString.property REGISTRATION_VIDEO_URL
    return $(
      "<div style='padding:0;'><iframe style='float:left;' src='" +
        ENV.REGISTRATION_VIDEO_URL +
        "' width='800' height='450' frameborder='0' title='" +
        htmlEscape(I18n.t('Video Player')) +
        "' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>",
    ).dialog({
      width: 800,
      title: I18n.t('Canvas Introduction Video'),
      modal: true,
      resizable: false,
      close() {
        return $(this).remove()
      },
      zIndex: 1000,
    })
  }),
)

const loadExtension = extensions['ui/features/registration/jquery/index.js']?.()
if (loadExtension) {
  loadExtension
    .then(extension => {
      extension.default()
    })
    .catch(error => {
      throw new Error(
        'Error loading extension for ui/features/registration/jquery/index.js: ',
        error,
      )
    })
}
