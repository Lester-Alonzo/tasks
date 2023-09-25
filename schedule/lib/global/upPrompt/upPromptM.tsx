import styles from './U.module.css'
export function UpPromptM ({url, close}:{url:string, close:() => void}) {
    async function CopyToclip() {
       await navigator.clipboard.writeText(url) 
       close()
    }
return (
    <div style={{position:"fixed", top:"1rem", left:"40%", backgroundColor:"aliceblue", padding:"1rem", borderRadius:"11px", display:"flex", gap:"1rem"}}>
        <input type="text" defaultValue={url} style={{border:"none", padding:"1rem", color:"black", backgroundColor:"white", borderRadius:"22px", boxShadow:"1px 0px 12px rgba(0,0,0,.2)"}}/>
        <button style={{padding:".5rem 1.4rem", backgroundColor:"#8ee6a4", color:"black", border:"none", borderRadius:"22px", boxShadow:"1px 0px 12px rgba(0,0,0,.2)"}} onClick={CopyToclip}>Copy</button>
        <button  style={{padding:".5rem 1.4rem", backgroundColor:"#f07575", color:"black", border:"none", borderRadius:"22px", boxShadow:"1px 0px 12px rgba(0,0,0,.2)"}} onClick={close}>❌</button>
    </div>
)
}