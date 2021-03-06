import StreamRPC from '@mainframe/rpc-stream'
import electronTransport from '@mainframe/transport-electron'

export default function createRPC(channel?: string | undefined): StreamRPC {
  return new StreamRPC(electronTransport(channel))
}
