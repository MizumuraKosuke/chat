import Header from './Header'

const layoutStyle = {
    background: '#effefe',
    color: '#000000',
    fontFamily:"ヒラギノ角ゴ Pro W3",
    fontSize:20
}

const Layout = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
)

export default Layout