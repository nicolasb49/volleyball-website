import { ImageResponse } from 'next/og';

export default async function Image(){
  return new ImageResponse(
    (
      <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'#e8f5e9',fontSize:60,fontWeight:800,color:'#2e7d32',padding:40}}>
        <div style={{fontSize:32,fontWeight:500,marginBottom:16}}>SV Karlsruhe Beiertheim</div>
        Volleyball Damen
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
