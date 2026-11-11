/*
 * Copyright (C) 2026 - present Instructure, Inc.
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

const signupDialog = vi.fn()
vi.mock('@canvas/signup-dialog', () => ({loadSignupDialog: Promise.resolve(signupDialog)}))
vi.mock('@canvas/bundles/extensions', () => ({default: {}}))

describe('registration page', () => {
  beforeAll(async () => {
    document.body.innerHTML = `
      <div class="registration-content">
        <a id="registration_login" href="/login">Log in</a>
        <a class="signup_link" data-template="studentDialog" title="Student Signup" href="#">Student</a>
      </div>
    `
    await import('../index')
  })

  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('lets the login link navigate without opening an inline form', () => {
    const event = $.Event('click')
    $('#registration_login').triggerHandler(event)

    expect(event.isDefaultPrevented()).toBe(false)
    expect($('#registration_login').attr('href')).toBe('/login')
    expect($('#login_form')).toHaveLength(0)
  })

  it('still opens the selected signup dialog', async () => {
    const event = $.Event('click')
    $('.signup_link').triggerHandler(event)
    await Promise.resolve()

    expect(event.isDefaultPrevented()).toBe(true)
    expect(signupDialog).toHaveBeenCalledWith('studentDialog', 'Student Signup', undefined)
  })
})
