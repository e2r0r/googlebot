var prev_obj = null;
var timerID = 0;
var objnames = new Array();
var objurls = new Array();
var callobjs = new Array ();
var callbacks = 0;
var timerID2 = 0;

function findPosX(obj)          
{
  var curleft = 0;
  if (obj.offsetParent)
  {
    while (obj.offsetParent)
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function findPosY(obj)          
{
    var curtop = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

function displayMenu(name)
{
       	if (prev_obj != null)
	{
           	prev_obj.visibility = "hidden";
	}
       	var obj = eval ("document.all." + name + ".style");
       	obj.visibility = "visible";
       	prev_obj = obj;
//	timerID = setTimeout ("closeMenu()", 2000);
}

function refine (key1, key2)
{
	window.location="?key=" + key1 + "&sub=" + key2;	
}

function searchkeyword (key1)
{
	window.location= "?key="+key1;
}

function closeMenu()
{
       	if (prev_obj != null)
	{
           	prev_obj.visibility = "hidden";
	}
       	prev_obj = null;
	if (timerID)
	{
		clearTimeout(timerID);
		timerID = 0;
	}
}

function UnfadeMenu ()
{
        if (timerID)
        {
                clearTimeout(timerID);
                timerID = 0;
        }
}

function fadeMenu ()
{
        if (timerID)
        {
                clearTimeout(timerID);
                timerID = 0;
        }
       timerID = setTimeout ("closeMenu()", 2000);
}

function displayPage (image_name, wnd_name, objUrl)
{
	var callobj;
        if (window.XMLHttpRequest)
        {
                callobj = new XMLHttpRequest();
        }
        else
        {
                callobj = new ActiveXObject("Microsoft.XMLHTTP");
        }
        callobj.onreadystatechange = reportStatus;
        callobj.open("GET", objUrl, false);
        callobj.send(null);
        
	if (callobj.readyState == 4)
        {
        	var refobj = eval ("document.all." + image_name);
                var obj = eval ("document.all." + wnd_name);
                if (refobj != null && obj != null)
                {
        		var top = findPosY (refobj) + refobj.offsetHeight;
        		var left = findPosX (refobj);
        		var right = left + 200;
        		var bottom = top + 200;
        		obj.style.position = "absolute";
        		obj.style.left = left + 'px';
        		obj.style.top = top + 'px';
        		obj.style.right = right + 'px';
        		obj.style.bottom = bottom + 'px';
        		obj.style.z_index = 'topmost';

                	obj.innerHTML = callobj.responseText;
		}
	}

}

function GetWidth()
{
        var x = 0;
        if (self.innerHeight)
        {
                x = self.innerWidth;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        {
                x = document.documentElement.clientWidth;
        }
        else if (document.body)
        {
                x = document.body.clientWidth;
        }
        return x;
}
 
function GetHeight()
{
        var y = 0;
        if (self.innerHeight)
        {
                y = self.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        {
                y = document.documentElement.clientHeight;
        }
        else if (document.body)
        {
                y = document.body.clientHeight;
        }
        return y;
}

function showPage (image_name, wnd_name, keyword)
{
	if (timerID2)
	{
		clearTimeout (timerID2);
		timerID2 = 0;
	}
	timerID2 = setTimeout ("displayPage(" + image_name + "," + wnd_name + ",\"" + keyword + "\")", 1000);
}

function addXMLHttpObj(objName, objUrl)
{
//alert(objName);
	var index = callbacks;
	for (n = 0; n < callbacks; n++)
	{
		if (objnames[n] == objName)
		{
			index = n;
		}
	}
     	objnames[index] = objName;
        objurls[index] = objUrl;
	if (callobjs[index])
	{
		callobjs[index].abort ();
	}
     	if (window.XMLHttpRequest)
	{
        	callobjs[index] = new XMLHttpRequest();
	}
        else
	{
        	callobjs[index] = new ActiveXObject("Microsoft.XMLHTTP");
	}
        callobjs[index].onreadystatechange = reportStatus;
        callobjs[index].open("GET", objUrl, true);
        callobjs[index].send(null);
	if (index == callbacks)
	{ 
       		callbacks++;
	}
}

function downloaddisplayMenu(name, url)
{
	for (n = 0; n < callbacks; n++)
	{
		if (objnames[n] == name)
		{
			if (callobjs[n] == null)
			{
				displayMenu (name);
			}
			return;
		}
	}
	addXMLHttpObj(name, url);	
}

var suggestion_index = -1;
var suggestion_timer_ID = 0;
var suggestion_arg1 = 0;
var suggestion_arg2 = 0;
var suggestion_arg3 = 0;
var keyCode = 0;
function keywordsuggestion_entry (val, objname, refobjname)
{
	if (suggestion_timer_ID)
	{
                clearTimeout(suggestion_timer_ID);
                suggestion_timer_ID = 0;
	}
	suggestion_arg1 = val;
	suggestion_arg2 = objname;
	suggestion_arg3 = refobjname;
	keyCode = event.keyCode;
	suggestion_timer_ID = setTimeout ("keywordsuggestion_event()", 20);
}

function keywordsuggestion(val, objname, refobjname, event)
{
        keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode ?event.charCode : 30;
        //alert (keyCode);
        if (keyCode == 40 || keyCode == 38)
        {
		if (suggestion_index >= 0)
		{
			var clr_obj = document.getElementById ('clr_' + suggestion_index);
                	if (clr_obj != null)
                	{
                        	clr_obj.style.backgroundColor='#ffffff';
                	}
		}
                if (keyCode == 40)
                {
                        suggestion_index++;
                        if (document.getElementById ('clr_' + suggestion_index) == null)
                        {
                                suggestion_index--;
                        }
                }
                else
                {
                        suggestion_index--;
                }
                if (suggestion_index < 0)
                {
                        suggestion_index = 0;
                }
                var clr_obj = document.getElementById ('clr_' + suggestion_index);
                if (clr_obj != null)
		{
			clr_obj.style.backgroundColor='#dfdfff';
		}

                var obj = document.getElementById ('suggestion_' + suggestion_index);
                if (obj != null)
                {
                //      obj.style.font = '12pt';
                        var key_obj = document.getElementById (refobjname);
                        if (key_obj != null)
                        {
                                val1 = obj.innerText?obj.innerText:obj.innerHTML?obj.innerHTML:obj.textContent;
                                val1 = val1.replace (/\&nbsp\;/ig, " ");
                                key_obj.value = val1.replace (/<b>|<\/b>/ig, "");
                        }
                }
		if (suggestion_index > 0 && suggestion_index % 10 == 0)
                {
			var idx = (suggestion_index / 5);
			var prev_idx = idx - 1;
			showtip (idx, prev_idx); 
		}

                return;
        }
        suggestion_index = -1;
        var obj = document.getElementById (objname);
       // obj.innerHTML = "";
        if (val == null || val.length == 0)
        {
       //         return;
        }
        var refobj = document.getElementById (refobjname);
        if (refobj == null)
        {
        }
        else
        {
        }
        var top = findPosY (refobj) + refobj.offsetHeight;
        var left = findPosX (refobj);
        var right = left + 100;
        var bottom = top + 200;
        obj.style.position = "absolute";
        obj.style.left = left + 'px';

        obj.style.top = top + 'px';
        obj.style.right = right + 'px';
        obj.style.bottom = bottom + 'px';
        obj.style.z_index = 'topmost';
        val = val.replace(/ /, "+");
        addXMLHttpObj(objname, "suggest?key=" + val);

}

function keywordsuggestion_event()
{
      keywordsuggestion (suggestion_arg1, suggestion_arg2, suggestion_arg3);
}

function showtip(index, previndex)
{
        var obj = document.getElementById ("a_" + previndex);
	if (obj != null)
	{
		obj.style.visibility = "hidden";
		obj.style.position = "absolute";
	}	
	obj = document.getElementById("tip" + index);
	if (obj != null)
	{
		obj.style.visibility = "visible";
		obj.style.position = "";
		obj.style.left = 0;
		obj.style.top = 0;
	}
}

function hidewindow (objname)
{
	var obj = document.getElementById(objname);
	if (obj != null)
	{
		obj.style.position = "absolute";
		obj.style.visibility = "hidden";
	}
}

function showwindow (objname, hideobjname, chk,eventTag)
{
        var obj = document.getElementById (hideobjname);
	if (obj == null)
	{
		return;
	}
	if (chk == 1)
	{
        	var event = eventTag || window.event;

		var left = findPosX (obj);
		var top = findPosY (obj);
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		var pt_x = event.clientX + document.body.scrollLeft;
		var pt_y = event.clientY + document.body.scrollTop;
		if (pt_x >= left && pt_x <= left + width && pt_y >= top && pt_y <= top + height)
		{
			return;
		}
	}
	
        if (obj != null)
        {
                obj.style.position = "absolute";
                obj.style.visibility = "hidden";
        }

        obj = document.getElementById(objname);
        if (obj != null)
        {
		obj.style.position = "";
                obj.style.visibility = "visible";
        }
}

var objajax = new Array();
var test =0;
function reportStatus()
{
	for (i = 0; i < callobjs.length; i++)
	{
		if (callobjs[i] == null)
		{
			continue;
		}
    		if (callobjs[i].readyState == 4)
		{
		      	var obj = eval ("document.all." + objnames[i]);
			if (obj != null)
			{
			//alert (i +"  :   "+objnames[i]+"--->"+(callobjs[i].responseText).length);
                                if((callobjs[i].responseText).length<10)
                                {
                //                    obj.style.display= "none";
					if (obj.style != null)
					{
                				obj.style.visibility = "hidden";
                				obj.style.position = "absolute";
					}
                                    continue;
                                }
				obj.innerHTML = callobjs[i].responseText;
				obj.style.visibility = "visible";

                                if(objnames[i]== 'topsite_search') {
                                    objajax[test++] = 'searcht_result';
                                    setallcontent('searcht_','searcht_result',1,'ptt','reajax');
                                }else if(objnames[i]== 'yebol_suggestion') {
                                    objajax[test++] = 'searche_result';
                                    setallcontent('searche_','searche_result',1,'pet','reajax');
                                }else if (objnames[i] == 'yebol_category') {
                                    if(objurls[i].indexOf("num=24")!=-1){
                                        setallcontent('searchc_','searchc_result',1,'pct','reajax');
                                    }else {
                                        setallcontent('searchc_','searchc_result',0,'pct',null);
                                    }
                                }else if (objnames[i] == 'yebol_news') {
                                    setallcontent('searchn_','searchn_result',0,null,null);
                                }else if (objnames[i] == 'yebol_image') {
                                    setallcontent('searchi_','searchi_result',0,null,null);
                                }
			}
			callobjs[i] = null;
		}
	}
}

function setallcontent (name, target_name,curP,id1,id2 )
{
    var obj1 = document.getElementById (name+curP);
    if(curP == 1&&obj1 ==null&&id2 == 'reajax')
    {
        obj1 = document.getElementById (name+0);
    }
    var target = document.getElementById (target_name);
    if (obj1 != null && target != null)
    {
        target.innerHTML = obj1.innerHTML;
        if(id1==null &&id2 ==null)
        {
            return false;
        }
        var html = '';
        html += ("<a class=\"page_right\" onclick=\"setallcontent('"+ name + "', '" + target_name + "', " + (curP + 1) + ", '" + id1 + "', '"+id2+"')\" href=\"javascript:void(0)\" title=\"Next\">&nbsp;</a>");
        html += ("<a class=\"page_left\" onclick=\"setallcontent('"+ name + "', '" + target_name + "', " + (curP - 1) + ", '" + id1 + "', '"+id2+"')\" href=\"javascript:void(0)\" title=\"Back\">&nbsp;</a>");
        var wp = document.getElementById(id1);
        var wn = document.getElementById(id2);
        if (wp != null)
        {
            wp.innerHTML = html;
        }
        if (wn != null)
        {
            wn.innerHTML = html;
        }
    } else if(curP ==1) {
        var obj_key = document.getElementById("key1");
        if (obj_key!= null){
            if(target_name == "searcht_result" && array_has(objajax,target_name) == false){
                addXMLHttpObj('topsite_search','/topsite_search?key='+obj_key.value);
            } else if(target_name == "searchc_result"){
                addXMLHttpObj('yebol_category','/yebol_category?num=24&key='+obj_key.value);
            } else if(target_name == "searche_result" && array_has(objajax,target_name) == false){
                addXMLHttpObj('yebol_suggestion','/yebol_suggest?num=24&key='+obj_key.value);
            }
        }
    }
    return false;
}

function array_has(arr,val){
    for(var i =0;i<arr.length;i++){
        if(arr[i] == val){
            return true;
        }
    }
    return false;
}
