// JSON-P Twitter fetcher for Octopress
// (c) Brandon Mathis // MIT License
/* Sky Slavin, Ludopoli. MIT license.  * based on JavaScript Pretty Date * Copyright (c) 2008 John Resig (jquery.com) * Licensed under the MIT license.  */
function prettyDate(e){if(navigator.appName==="Microsoft Internet Explorer")return"<span>&infin;</span>";var t={just_now:" now",minute_ago:"1m",minutes_ago:"m",hour_ago:"1h",hours_ago:"h",yesterday:"1d",days_ago:"d",last_week:"1w",weeks_ago:"w"},n=new Date,r=n.getTime(),i=r+6e4,s=new Date(e),o=(i-s.getTime())/1e3,u=Math.floor(o/86400);return isNaN(u)||u<0?"<span>&infin;</span>":u===0&&(o<60&&t.just_now||o<120&&t.minute_ago||o<3600&&Math.floor(o/60)+t.minutes_ago||o<7200&&t.hour_ago||o<86400&&Math.floor(o/3600)+t.hours_ago)||u===1&&t.yesterday||u<7&&u+t.days_ago||u===7&&t.last_week||u>7&&Math.ceil(u/7)+t.weeks_ago}function linkifyTweet(e,t){e=e.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi,'<a href="$1$2">$2</a>').replace(/(^|\W)@(\w+)/g,'$1<a href="http://twitter.com/$2">@$2</a>').replace(/(^|\W)#(\w+)/g,'$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>');for(var n in t)if(t[n].expanded_url!=null){var r=new RegExp(t[n].url,"g");e=e.replace(r,t[n].expanded_url);var r=new RegExp(">"+t[n].url.replace(/https?:\/\//,""),"g");e=e.replace(r,">"+t[n].display_url)}return e}function showTwitterFeed(e,t){var n=document.getElementById("tweets"),r="";for(var i in e)r+='<li><p><a href="http://twitter.com/'+t+"/status/"+e[i].id_str+'">'+prettyDate(e[i].created_at)+"</a>"+linkifyTweet(e[i].text.replace(/\n/g,"<br>"),e[i].entities.urls)+"</p>"+"</li>";n.innerHTML=r}function getTwitterFeed(e,t,n){t=parseInt(t,10),$.ajax({url:"http://api.twitter.com/1/statuses/user_timeline/"+e+".json?trim_user=true&count="+(t+20)+"&include_entities=1&exclude_replies="+(n?"0":"1")+"&callback=?",type:"jsonp",error:function(e){$("#tweets li.loading").addClass("error").text("Twitter's busted")},success:function(n){showTwitterFeed(n.slice(0,t),e)}})};