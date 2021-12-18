import { BOT_TOKEN } from '../init/env'
import { useState } from 'react'
import importedOrders from '../database/orders.json'
// import importedOrders from '/home/romv2/projects_wsl/telegram/p2pVideoEditorBot/files/orders.json'
// import { adapter } from '@grammyjs/storage-firestore'
// import { Firestore } from '@google-cloud/firestore'

if (BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided! BOT_TOKEN is undefined.')
}

export const Orders = () => {
  const [orders] = useState(importedOrders)
  return (
    <>
      {/* {JSON.stringify(orders, null, 2)}, */}
      {Object.entries(orders).map(user => (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ))}
    </>
  )
}
