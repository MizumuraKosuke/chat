import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
        <div className="wrapper01">
            <div className="icon"><img src="static/icon.png" width="50" height="50"/></div>
            <div className="wrap01">
                <div>
                    <div className="chatroom">chat room</div>
                    <div className="subname">chat room</div>
                </div>
            </div>
            <div className="wrap02">
                <ul>
                    <div className="company">company</div>
                    <div className="companyname">Sound On Live</div>
                </ul>
                <ul>
                    <div className="creater">creater</div>
                    <div className="creatername">Hosei Students</div>
                </ul>                    
            </div>
        </div>
        <div><hr></hr></div>
        <style jsx>{`
            h1,h2,h3,h4,h5,p{
                margin:0;
                padding:0;
            }
            
            .wrapper01 {    
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
              }
        
            .wrapper01 .wrap01{
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
              }
        
            .icon {
                flex: 0 0 auto;
                padding-left: 15px;
                padding-right: 15px;
                padding-top: 25px;
              }
        
            .chatroom {
                flex: 0 0 auto;
                padding-top: 17px;
                color: #332aa3;
                font-size: 22px;
                font-weight: bold;
              }
        
            .subname {
                flex: 0 0 auto;
                padding: 0;
                opacity: 0.7;
                font-size: 23px;
              }
        
            .wrapper01 .wrap02{
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                margin-left: auto;
                padding-right: 10px;
              }
        
            .company {
                flex: 0 0 auto;
                padding: 0;
                opacity: 0.5;
              }
        
            .companyname {
                flex: 0 0 auto;
                padding: 0;
                color: #332aa3;
                font-weight: bold;
              }
        
            .wrapper01 .wrap03{
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                margin-left: auto;
              }
        
            .creater {
                flex: 0 0 auto;
                padding: 0;
                opacity: 0.5;
              }
        
            .creatername {
                flex: 0 0 auto;
                padding: 0;
                color: #332aa3;
                font-weight: bold;
              }
        
            .hr {
                border-bottom: 1px solid #cec2c7;
             }
    `}</style>
    </div>
)

export default Header