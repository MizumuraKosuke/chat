import Layout from '../components/MyLayout.js'
import {withRouter} from 'next/router'
import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import io from 'socket.io-client'

class Page extends Component {
    static async getInitialProps ({ req }) {
        const res = await fetch('http://localhost:3010/chat')
        const data = await res.json()
        return { data }
    }

    state = {
        field: '',
        name: '',
        day: '',
        messages : this.props.data
    }

    componentDidMount() {
        this.socket = io('/chat')
        this.socket.on('mes', this.handleEntryMessage)
        this.socket.on('my message', this.handleMyMessage)
        this.socket.on('broad message', this.handleBroadMessage)
        this.socket.on('db drop', this.handleDelete)
    }

    handleEntryMessage = (message) => {
        message.type = 'Entry'
        console.log(message)
        this.setState(state => ({
            messages: state.messages.concat(message)
        }))
    }

    handleMyMessage = (message) => {
        message.type = 'Personal'
        console.log(message)
        this.setState(state => ({
            messages: state.messages.concat(message)
        }))
    }

    handleBroadMessage = (message) => {
        console.log(message)
        this.setState(state => ({
            messages: state.messages.concat(message)
        }))
    }

    handleDelete = () => {
        console.log('ddd')
        this.setState(state => ({
            messages: []
        }))
    }

    messageChange = event => {
        this.setState({ message: event.target.value });
    }

    messageSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        const data = {
            name: this.state.name,
            message: this.state.message
        }
        this.socket.emit('chat message', data)
    }

    nameChange = event => {
        this.setState({ name: event.target.value });
    }

    nameSubmit = event => {
        event.preventDefault()
        const name = this.state.name
        const broadMessage = {
            name: this.state.name,
            message: this.state.name + 'さんが入室しました。'
        }
        const personalMessage = {
            name: this.state.name,
            message: this.state.name + 'として入室しました。'
        }
        this.socket.emit('broadcast', broadMessage)
        this.socket.emit('personal', personalMessage)
    }

    deleteSubmit = event => {
        console.log('p')
        event.preventDefault()
        this.socket.emit('deleteDB')
    }

    render (){
        return (
            <Layout>
                <div>
                    <div>
                        <form id="nameform" onSubmit={(e) => this.nameSubmit(e)}>
                            <div className="name">
                                <input id="nam" onChange={this.nameChange} type="text" placeholder="name" />
                            </div>  
                            <button>submit</button>
                        </form>
                    </div>
                    <form onSubmit={(e) => this.deleteSubmit(e)}><button id="delete">Delete</button></form>
                    <p>{this.state.entryMessage}</p>
                    <div className="wrapper02">
                        <div className="date">{ this.state.day }</div>
                    </div>
                    <div className="wrapper03">
                        {
                            this.state.messages.map((messages) => (
                            <div>
                                <div>
                                    {messages.type === undefined &&
                                        <div className="talks">
                                            <div className="wrap03">
                                                <div className="opponent"><img src="static/icon.png" width="50" height="50"/></div>
                                                <div className="broadname">{ messages.name }</div>
                                                <div className="messagebox01">{ messages.message }</div>
                                                <div className="time01">{ messages.date }</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {messages.type === 'Personal' &&
                                        <div className="talks">
                                            <div className="wrap04">
                                                <div className="time02">{ messages.date }</div>
                                                <div className="messagebox02">{ messages.message }</div>
                                                <div className="self"><img src="static/icon.png" width="50" height="50"/></div>
                                                <div className="myname">{ messages.name }</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {messages.type === 'Entry' &&
                                        <div className="talks">
                                            <div className="wrap05">
                                                <div className="time02">{ messages.date }</div>
                                                <div className="messagebox02">{ messages.message }</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="wrapper04">
                        <form id="mesform" onSubmit={(e) => this.messageSubmit(e)}>  
                            <div className="message">
                                <input id="m" type="text" onChange={this.messageChange} placeholder="Type something..." />
                            </div>
                            <div className="send" type="submit">
                                <input type="image" src="static/paper-airplane02.png" name="message" width="50" height="50"/>
                            </div>
                        </form>
                    </div>
                </div>
                <style jsx>{`
                    h1,h2,h3,h4,h5,p{
                        margin:0;
                        padding:0;
                    }
        
                    .wrapper02{
                        display: flex;
	                    align-items: center;
	                    justify-content: center;
                    }
        
                    .date{
                        width: 150px;
                        background-color:#332aa3;
                        color: #ffffff;
                        border-radius: 1.5em;	
                        opacity: 1;
                        text-align: center;
                    }
        
                    .wrapper03 .wrap03{
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        width: 650px;
                        padding-left: 15px;
                        padding-top: 50px;
                    }
        
                    .wrap03 .self{
                        flex: 0 0 auto;
                        padding-left: 15px;
                        padding-right: 15px;
                    }
        
                    .wrap03 .messagebox01{
                        width: 500px;
                        background-color:#332aa3;
                        color: #ffffff;
                        border-radius: 0em 1.0em 1.0em 1.0em/0em 1.0em 1.0em 1.0em;	
                        opacity: 1;
                        text-align: left;
                        word-wrap: break-word;
                        min-width: 0;
                        padding: 10px;
                    }
        
                    .wrap03 .time01{
                        padding-left: 15px;
                        flex: 1 1 auto;
                        opacity: 0.5;
                    }
        
                    .wrapper03 .wrap04{
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        margin-left: auto;
                        width: 450px;
                        padding-right: 25px;
                        padding-top: 100px;
                    }

                    .wrapper03 {
                        padding-bottom: 110px
                    }
        
                    .wrap04 .time02{
                        padding-right: 20px;
                        flex: 1 1 auto;
                        opacity: 0.5;
                    }  
        
                    .wrap04 .messagebox02{
                        width: 300px;
                        background-color:#7f8184;
                        color: #ffffff;
                        border-radius: 1.0em 0em 1.0em 1.0em/1.0em 0em 1.0em 1.0em;		
                        opacity: 1;
                        text-align: left;
                        word-wrap: break-word;
                        min-width: 0;
                        padding: 10px;
                    }
        
                    .wrap04 .opponent{
                        flex: 0 0 auto;
                        padding-left: 15px;
                        padding-right: 15px;
                    }
        
                    .wrapper04 {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        background: #ffffff;
                        z-index: 100;
                    }
                
                    .name {
                        padding: 1px;
                        flex: 0 0 auto;
                        width: 100px;
                        border-top: 2px solid #ededf2;
                        opacity: 1;
                        height: 85px;
                    }
                
                    .name input {
                        padding-left: 20px;
                        border: 0;
                        width: 80%;
                        height: 100%;
                        font-size: 20px;
                        opacity: 0.5;
                    }
                
                    .message {
                        padding: 1px;
                        flex: 1 1 auto;
                        border-top: 2px solid #ededf2;
                        opacity: 1;
                    }
                
                    .message input {
                        padding: 1px;
                        border: 0;
                        width: 100%;
                        height: 100%;
                        font-size: 20px;
                        opacity: 0.5;
                    }
                    
                    .send {
                        flex: 0.025 0.045 auto;
                        border-top: 2px solid #ededf2;
                        padding-top: 20px;
                        padding-left: 15px;
                        opacity: 1;
                    }
                
                    .send input {
                        padding: 0;
                        border: 0;
                        background: #ffffff;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default withRouter(Page)