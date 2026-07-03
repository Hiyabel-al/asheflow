/* ASHEFLOW — shared mock data used across dashboard, inbox, CRM, automation & studio pages.
   Single source of truth so numbers stay consistent across every page. */
(function(){
  'use strict';

  const fans = [
    {id:'mara',   name:'Mara J.',    username:'@marajanes',    platform:'OnlyFans', segment:'vip',      tags:['Big Spender','Loyal'],          spent:1240, spentLabel:'$1,240', engagement:92, active:'2h ago',  activeDays:0,  init:'MJ', notes:'Loves beach content, tips well on Fridays.', joined:'Mar 2026'},
    {id:'devon',  name:'Devon R.',   username:'@devon.r',      platform:'Fansly',   segment:'high',     tags:['High Spender'],                 spent:860,  spentLabel:'$860',   engagement:78, active:'5h ago',  activeDays:0,  init:'DR', notes:'Prefers behind-the-scenes clips.', joined:'Jan 2026'},
    {id:'theo',   name:'Theo K.',    username:'@theok_',       platform:'OnlyFans', segment:'regular',  tags:['New Fan'],                      spent:120,  spentLabel:'$120',   engagement:45, active:'1d ago',  activeDays:1,  init:'TK', notes:"Joined last week, asks about drops.", joined:'Jun 2026'},
    {id:'priya',  name:'Priya S.',   username:'@priyasunshine',platform:'OnlyFans', segment:'vip',      tags:['Big Spender','Early Supporter'],spent:2010, spentLabel:'$2,010', engagement:95, active:'3h ago',  activeDays:0,  init:'PS', notes:'One of the first 50 subscribers.', joined:'Nov 2025'},
    {id:'alex',   name:'Alex M.',    username:'@alexm',        platform:'Fansly',   segment:'regular',  tags:['Regular'],                      spent:45,   spentLabel:'$45',    engagement:22, active:'3d ago',  activeDays:3,  init:'AM', notes:'', joined:'May 2026'},
    {id:'jordan', name:'Jordan B.',  username:'@jbfan22',      platform:'OnlyFans', segment:'high',     tags:['High Spender'],                 spent:640,  spentLabel:'$640',   engagement:61, active:'1d ago',  activeDays:1,  init:'JB', notes:'Responds best to voice notes.', joined:'Feb 2026'},
    {id:'sarah',  name:'Sarah',      username:'@sarah_says',   platform:'OnlyFans', segment:'vip',      tags:['Big Spender'],                  spent:1890, spentLabel:'$1,890', engagement:30, active:'14d ago', activeDays:14, init:'SA', notes:'Went quiet after a great first month — needs a reconnect message.', joined:'Dec 2025'},
    {id:'nina',   name:'Nina P.',    username:'@ninap',        platform:'Fansly',   segment:'inactive', tags:['At Risk'],                      spent:310,  spentLabel:'$310',   engagement:8,  active:'21d ago', activeDays:21, init:'NP', notes:'Used to tip weekly, went quiet in June.', joined:'Aug 2025'},
    {id:'chris',  name:'Chris L.',   username:'@chrisl',       platform:'OnlyFans', segment:'inactive', tags:['At Risk'],                      spent:75,   spentLabel:'$75',    engagement:5,  active:'30d ago', activeDays:30, init:'CL', notes:'', joined:'Jul 2025'},
    {id:'riley',  name:'Riley T.',   username:'@rileyt',       platform:'OnlyFans', segment:'regular',  tags:['Regular'],                      spent:200,  spentLabel:'$200',   engagement:55, active:'6h ago',  activeDays:0,  init:'RT', notes:'Always likes new posts within minutes.', joined:'Apr 2026'},
    {id:'morgan', name:'Morgan V.',  username:'@morganv',      platform:'Fansly',   segment:'high',     tags:['High Spender'],                 spent:720,  spentLabel:'$720',   engagement:68, active:'2d ago',  activeDays:2,  init:'MV', notes:'', joined:'Mar 2026'},
    {id:'kai',    name:'Kai W.',     username:'@kaiw',         platform:'OnlyFans', segment:'inactive', tags:['At Risk'],                      spent:150,  spentLabel:'$150',   engagement:12, active:'18d ago', activeDays:18, init:'KW', notes:'Responded well to a discount offer last time.', joined:'Sep 2025'},
  ];

  const toneMeta = [
    {key:'friendly',     label:'Friendly',     color:'var(--cyan)'},
    {key:'professional', label:'Professional', color:'#93c5fd'},
    {key:'premium',      label:'Premium',      color:'var(--violet)'},
    {key:'playful',      label:'Playful',      color:'var(--pink)'},
    {key:'custom',       label:'Custom',       color:'var(--text-faint)'},
  ];

  const conversations = [
    {id:'mara', init:'MJ', name:'Mara J.', segment:'vip', unread:true, lastActive:'2m ago',
      messages:[{from:'fan',text:'Hey! Been a while 👀'},{from:'fan',text:'I miss you ❤️'}],
      variants:{
        friendly:"Aw I missed you too! What have you been up to lately?",
        professional:"Thanks so much for the message — I've been heads-down creating, but I always love hearing from you.",
        premium:"I've been thinking about you too 💭 I've got something special waiting for you if you want to see it.",
        playful:"Aw I missed you too 🥺 what have you been up to today?",
        custom:""
      }},
    {id:'devon', init:'DR', name:'Devon R.', segment:'high', unread:false, lastActive:'20m ago',
      messages:[{from:'fan',text:'That last post was amazing'},{from:'me',text:'Thank you so much!! 🥰'},{from:'fan',text:'Thanks for the shoutout!'}],
      variants:{
        friendly:"Of course!! You always show up for me, means a lot 💜",
        professional:"I really appreciate your support — it means a lot and doesn't go unnoticed.",
        premium:"You're one of my favorites for a reason 💜 more exclusive stuff coming your way soon.",
        playful:"Of course babe, you always show up for me 💜",
        custom:""
      }},
    {id:'theo', init:'TK', name:'Theo K.', segment:'regular', unread:true, lastActive:'1h ago',
      messages:[{from:'fan',text:"When's the next drop?"}],
      variants:{
        friendly:"New drop is coming this Friday! You're gonna love it.",
        professional:"The next release is scheduled for Friday — I'll make sure you're notified.",
        premium:"Friday 👀 and I'm making sure my top supporters see it first — that includes you.",
        playful:"New drop is coming this Friday 👀 you're gonna love it",
        custom:""
      }},
    {id:'sarah', init:'SA', name:'Sarah', segment:'vip', unread:true, lastActive:'14 days ago',
      messages:[{from:'fan',text:"Haven't heard from you in a bit, everything ok?"}],
      variants:{
        friendly:"Hey! All good, just been heads down creating. How have you been?",
        professional:"Hi Sarah, everything's great — just been focused on new content. Thanks for checking in!",
        premium:"Hey you 💭 I've actually got something new I've been saving just for my VIPs like you.",
        playful:"Hey stranger 👀 I was just thinking about you actually",
        custom:""
      }},
    {id:'priya', init:'PS', name:'Priya S.', segment:'vip', unread:false, lastActive:'3h ago',
      messages:[{from:'fan',text:'Loved the new set, especially the last three shots'}],
      variants:{
        friendly:"Thank you so much, that means a lot! Which one was your favorite?",
        professional:"Thank you for the thoughtful feedback — I'm really glad that set landed well.",
        premium:"You always know the good ones 💜 there's more where that came from, just for supporters like you.",
        playful:"Ok you have great taste 👀 those were my favorites too",
        custom:""
      }},
    {id:'riley', init:'RT', name:'Riley T.', segment:'regular', unread:false, lastActive:'6h ago',
      messages:[{from:'fan',text:'Do you ever do requests?'}],
      variants:{
        friendly:"Sometimes! Send me what you had in mind and I'll see what I can do.",
        professional:"I do consider requests from time to time — feel free to share the details.",
        premium:"For my top supporters, yes 👀 tell me what you're thinking.",
        playful:"Ooh depends what you're asking for 👀 tell me more",
        custom:""
      }},
  ];

  const automations = [
    {id:'welcome', name:'Welcome Flow', active:true, trigger:'New fan subscribes → Send intro message → Wait 1hr → Send PPV', sent:1204, replyRate:38, category:'Welcome Sequence'},
    {id:'followup', name:'Follow-ups', active:true, trigger:'No reply after 24hrs → Send check-in message', sent:842, replyRate:21, category:'Follow-up'},
    {id:'reengage', name:'Re-engagement', active:false, trigger:'Fan inactive 14 days → Send win-back offer', sent:310, replyRate:12, category:'Re-engagement'},
    {id:'vipbday', name:'VIP Birthday Messages', active:true, trigger:"VIP fan's birthday → Send personalized message + gift offer", sent:64, replyRate:54, category:'Welcome Sequence'},
    {id:'dropannounce', name:'Content Drop Announcement', active:true, trigger:'New content published → Notify top 20% spenders first', sent:410, replyRate:33, category:'Follow-up'},
  ];

  const scheduledMessages = [
    {fan:'Mara J.', init:'MJ', preview:'New set just dropped 🌊 want first look?', when:'Today, 6:00 PM', status:'scheduled'},
    {fan:'All VIP Fans', init:'⭐', preview:'Exclusive weekend content going live soon...', when:'Tomorrow, 9:00 AM', status:'scheduled'},
    {fan:'Priya S.', init:'PS', preview:'Thank you note + loyalty discount code', when:'Fri, 2:00 PM', status:'scheduled'},
    {fan:'Devon R.', init:'DR', preview:'Following up on your last message', when:'Yesterday, 4:12 PM', status:'sent'},
  ];

  const studioExamples = {
    caption: [
      "New set just dropped 🌊 which one's your favorite?",
      "Golden hour hits different when you're not wearing much 😏",
      "Feeling myself today ✨ full set live now"
    ],
    hook: [
      "You weren't ready for this one...",
      "POV: you just found my best content yet",
      "This almost didn't make the cut 👀"
    ],
    repurpose: [
      "Turn last week's top-performing photo set into a 15s teaser reel with captions.",
      "Cut your best Q&A responses into 3 standalone short clips for Stories.",
      "Repost your highest-tipped post with a fresh caption and a limited-time offer."
    ],
    trend: [
      "\"Get ready with me\" style intros are converting well this week",
      "Short vertical teasers (under 10s) are outperforming longer clips",
      "Fans are responding to behind-the-scenes captions right now"
    ]
  };

  const contentCalendar = [
    {date:'Mon', items:[{time:'9:00 AM', title:'Morning teaser post', type:'photo'}]},
    {date:'Tue', items:[]},
    {date:'Wed', items:[{time:'6:00 PM', title:'New set drop', type:'ppv'}]},
    {date:'Thu', items:[{time:'12:00 PM', title:'Behind the scenes clip', type:'video'}]},
    {date:'Fri', items:[{time:'2:00 PM', title:'VIP loyalty message', type:'message'},{time:'8:00 PM', title:'Weekend teaser', type:'photo'}]},
    {date:'Sat', items:[]},
    {date:'Sun', items:[{time:'10:00 AM', title:'Weekly recap post', type:'photo'}]},
  ];

  const promptLibrary = [
    {title:'Winback a quiet VIP', category:'Re-engagement', prompt:"Write a warm, low-pressure message to a VIP fan who hasn't messaged in 2 weeks, referencing that I miss chatting with them."},
    {title:'PPV upsell after a compliment', category:'Sales', prompt:"Fan just complimented my latest post. Write a flirty reply that naturally leads into offering my new PPV set."},
    {title:'Thank a big tipper', category:'Appreciation', prompt:"Write a genuine thank-you message for a fan who just sent a $50 tip, without sounding scripted."},
    {title:'New subscriber welcome', category:'Welcome Sequence', prompt:"Write a warm welcome message for a brand new subscriber, introducing my content style and posting schedule."},
    {title:'Re-engage after price question', category:'Sales', prompt:"Fan asked about custom content pricing 3 days ago and went quiet. Write a friendly follow-up."},
  ];

  const savedReplies = [
    {label:'👋 Welcome message', text:"Hey! Thank you so much for subscribing 🥰 I post new content a few times a week, and I love hearing from my fans — don't be shy!"},
    {label:'💸 PPV upsell', text:"I just dropped something new and exclusive 👀 want me to send it your way?"},
    {label:'🙏 Thank you', text:"Thank you so much, this really means the world to me 💜"},
    {label:'🎉 Birthday message', text:"Happy birthday!! 🎂 I wanted to send you something special today, just because."},
    {label:'💬 Re-engagement', text:"Hey stranger 👀 I noticed I haven't heard from you in a bit — everything okay?"},
  ];

  const analyticsSeries = {
    revenue:    [35,55,40,70,50,85,65,95,60,78,90,100],
    growth:     [30,45,55,60,80,88,70,92,75,84,96,100],
    fans:       [40,48,52,58,63,70,74,80,85,88,93,100],
    messages:   [55,60,58,68,72,66,80,75,90,85,95,100],
    automation: [20,35,42,50,58,64,70,75,80,84,90,95],
    engagement: [55,65,45,75,60,90,70,80,65,85,72,95],
    retention:  [70,68,72,75,80,82,79,85,88,86,90,92],
  };

  const notifications = [
    {ic:'🔥', text:"<b>Sarah</b> — VIP fan hasn't messaged in 2 weeks", t:'12m ago', unread:true},
    {ic:'💰', text:'New $50 tip from <b>Mara J.</b>', t:'1h ago', unread:true},
    {ic:'⚡', text:'Welcome Flow automation sent 12 messages', t:'3h ago', unread:false},
    {ic:'📅', text:'Content Calendar: post scheduled for tomorrow 9am', t:'6h ago', unread:false},
    {ic:'👥', text:'<b>Devon R.</b> just became a High Spender', t:'1d ago', unread:false},
  ];

  const integrations = [
    {name:'OpenAI', icon:'🧠', status:'live', desc:'Powers AI reply generation across your inbox.'},
    {name:'Claude', icon:'✳️', status:'live', desc:'Alternate model for tone-matched replies.'},
    {name:'Stripe', icon:'💳', status:'live', desc:'Payments, billing, and subscription management.'},
    {name:'Telegram', icon:'✈️', status:'beta', desc:'Sync conversations from Telegram fan channels.'},
    {name:'Discord', icon:'🎮', status:'beta', desc:'Manage your VIP Discord community from AsheFlow.'},
    {name:'Slack', icon:'💬', status:'soon', desc:'Get revenue and fan alerts inside Slack.'},
    {name:'Supabase', icon:'🗄️', status:'soon', desc:'Bring your own database for full data ownership.'},
    {name:'Zapier', icon:'🔗', status:'soon', desc:'Connect AsheFlow to 6,000+ other apps.'},
    {name:'Google Calendar', icon:'📅', status:'soon', desc:'Sync your content calendar automatically.'},
    {name:'Gmail', icon:'📧', status:'soon', desc:'Send weekly reports straight to your inbox.'},
  ];

  window.ASHEFLOW_DATA = { fans, toneMeta, conversations, automations, scheduledMessages, studioExamples, contentCalendar, promptLibrary, savedReplies, analyticsSeries, notifications, integrations };
})();
