import {Days, RUN} from '@/lib/types/global'
import {MAP_DAYS} from '@/lib/utils/utils'
export function Asignado ({dys, sa, type, pin}:{dys:Days[], sa:string, type:RUN, pin:string}) {

if(sa === '') return <td>sa</td>
else if(type === 'uni') return <td style={ {backgroundColor:"#64c9b5", color:"white", textShadow:"1px 1px 1px 1px black", fontSize:"1.5rem"} }>{pin}</td>
return (
    <td>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:".3rem"}}>
            {dys.map((dy, index) => (
                <p key={index} style={{backgroundColor:`${dy.date === new Date().getDay() ? '#e88282' : "#a4bff4"}`, borderRadius:"12px", padding:".4rem"}}>{MAP_DAYS[dy.date]}</p>
            ))}
        </div>
    </td>
)
}