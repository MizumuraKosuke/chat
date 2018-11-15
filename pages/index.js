import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import io from 'socket.io-client'

export default () => (
    <Layout>
        <div>
            <ul>
                <li>
                    <Link href="/chat">
                        <a>Chat</a>
                    </Link>
                </li>
            </ul>
        </div>
    </Layout>
)