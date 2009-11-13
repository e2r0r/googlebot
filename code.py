#!/usr/bin/env python
#-*- encoding:utf-8 -*-

import web
import re
from goparse.search import GoogleSearch

urls = ('/','index',
        '/newsearch','search',
        '/unavailable','sorry')

render = web.template.render("template/")
app = web.application(urls,globals())

class index:
    """
    """
    def GET(self):
        layout = {
's':'''<span class="mytop_n">Smart</span><a href="javascript:_sq('w');" class="mytop_navi">Web</a><a href="javascript:_sq('n');" class="mytop_navi">News</a><a href="javascript:_sq('v');" class="mytop_navi">Visualization</a>''',
'w':"""<a href="javascript:_sq('s');" class="mytop_navi">Smart</a><span class="mytop_n">Web</span><a href="javascript:_sq('n');" class="mytop_navi">News</a><a href="javascript:_sq('v');" class="mytop_navi">Visualization</a>""",
'n':"""<a href="javascript:_sq('s');" class="mytop_navi">Smart</a><a href="javascript:_sq('w')" class="mytop_navi">Web</a><span class="mytop_n">News</span><a href="javascript:_sq('v');" class="mytop_navi">Visualization</a>""",
'v':"""<a href="javascript:_sq('s');" class="mytop_navi">Smart</a><a href="javascript:_sq('w');" class="mytop_navi">Web</a><a href="javascript:_sq('n');" class="mytop_navi">News</a><span " class="mytop_n">Visualization</span>"""
}
        q = web.input()    
        if q and q.t in ['s','w','n','v']:
            guider = layout[q.t]
        elif not q:
            guider = layout['s']
        else:
            raise web.seeother("/")
        html = web.template.frender("template/index.html")
        html.globals['name'] = guider
        return html()


class search:
    """
    """

    def GET(self):
        query = web.input()
        if query and query.t and query.key:
            if query.t == 's':
                rawstr = r"""://(\S*link.php\?ref=\w*)"""
                compile_obj = re.compile(rawstr)
                gs = GoogleSearch("link.php?ref="+query.key.encode('utf-8'))
                gs.results_per_page = 10
                
                if query.start:
                    #return query.start
                    gs.page = int(query.start)/gs.results_per_page 
                else:
                    gs.page = 1
                
                results = gs.get_results()
                data = []
                for res in results:
                    match_obj = compile_obj.search(res.desc)
                    if match_obj:
                        url = match_obj.group(1)
                    else:
                        url = res.url
                    data.append([res.title,url])
                html = web.template.frender("template/newsearch.html")
                html.globals['data'] = data
                html.globals['key'] = query.key
                return html()
            else:
                raise web.seeother("/unavailable")
        else:
            raise web.seeother("/unavailable")
        return results()

class sorry:
    
    def GET(self):
        html = web.template.frender("template/unavailable.html")
        return html()
        
        

    

if __name__ == "__main__":
    app.run()
        
        

