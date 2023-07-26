/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Pocketbase from 'pocketbase'
import { serializeNonPOJOs } from './lib/utils'

export const handle = async ({ event, resolve }) => {
  try {
    const pb = new Pocketbase('http://139.144.176.23:80')
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh()
      event.locals.user = serializeNonPOJOs(pb.authStore.model)
    } else {
      event.locals.user = undefined
    }

    const response = await resolve(event)

    response.headers.set('set-cookie', pb.authStore.exportToCookie({ secure: true }))

    return response

  } catch (error) {
    // Handle the error here as per your requirements
    console.error('An error occurred:', error)

    // Return a properly formatted error response
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}