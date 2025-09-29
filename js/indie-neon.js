(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  const IndieNeon = {
    config: { actions: {} },
    configure(opts={}){ this.config = { ...this.config, ...opts }; },
    init(){
      this._initAccordion();
      this._initTabs();
      this._initDialogs();
      this._initDropdowns();
      // toast root
      if (!$('#toast-root')) { const d=document.createElement('div'); d.id='toast-root'; d.className='toast-root'; document.body.appendChild(d); }
      // demo regular button lit toggle
      const reg = $('#demoRegular'); if (reg) reg.addEventListener('click', ()=> reg.classList.toggle('active'));
    },

    _initAccordion(){
      const accs = $$('.accordion[data-accordion]');
      const closeAll = (except=null)=> accs.forEach(a=>{
        if(a===except) return;
        const b=$('[data-acc-btn]',a), p=$('[data-acc-panel]',a);
        b&&b.classList.remove('active'); b&&b.setAttribute('aria-expanded','false');
        p&&p.classList.remove('open'); p&&p.setAttribute('aria-hidden','true');
      });
      accs.forEach(a=>{
        const b=$('[data-acc-btn]',a), p=$('[data-acc-panel]',a);
        if(!p.id) p.id='acc-'+Math.random().toString(36).slice(2);
        b.setAttribute('aria-controls', p.id);
        b.addEventListener('click',()=>{
          const willOpen=!b.classList.contains('active');
          closeAll(willOpen?a:null);
          b.classList.toggle('active',willOpen);
          p.classList.toggle('open',willOpen);
          b.setAttribute('aria-expanded',String(willOpen));
          p.setAttribute('aria-hidden',String(!willOpen));
          // Deactivate regular button when menu is opened/closed
          const regularBtn = $('#demoRegular');
          if(regularBtn && regularBtn.classList.contains('active')) {
            regularBtn.classList.remove('active');
          }
          if(willOpen){ const first=$('.submenu-item',p); first&&first.focus(); }
        });
        $$('.submenu-item',p).forEach((item,idx,list)=>{
          const run=()=>{
            const key=item.getAttribute('data-action');
            if(key && typeof IndieNeon.config.actions[key]==='function'){ try{IndieNeon.config.actions[key]();}catch(e){console.error(e);} }
            
            // Apply ghost effect to clicked submenu item
            item.classList.add('ghost-effect');
            
            // Clear ghost effect after animation (don't close accordion)
            setTimeout(() => {
              item.classList.remove('ghost-effect');
            }, 300);
            
            // Keep accordion open - remove auto-close behavior
          };
          item.addEventListener('click',run);
          item.addEventListener('keydown',e=>{
            if(e.key==='Enter'||e.key===' '){ e.preventDefault(); run(); }
            if(e.key==='ArrowDown'){ e.preventDefault(); (list[idx+1]||list[0]).focus(); }
            if(e.key==='ArrowUp'){ e.preventDefault(); (list[idx-1]||list[list.length-1]).focus(); }
            if(e.key==='Home'){ e.preventDefault(); list[0].focus(); }
            if(e.key==='End'){ e.preventDefault(); list[list.length-1].focus(); }
            if(e.key==='Escape'){ e.preventDefault(); b.click(); }
          });
        });
      });
      // click outside
      document.addEventListener('click', e=>{ if(!e.target.closest('.accordion[data-accordion]')) closeAll(); });
    },

    _initTabs(){
      $$('.tabs[data-tabs]').forEach(tabs=>{
        const btns=$$('.tab',tabs);
        const activate=id=>{
          btns.forEach(b=>{
            const on=b.getAttribute('data-tab')===id;
            b.classList.toggle('active',on);
            b.setAttribute('aria-selected',String(on));
            const p = $('#'+b.getAttribute('data-tab'),tabs);
            p && p.classList.toggle('active',on);
          });
        };
        btns.forEach(b=>{
          b.addEventListener('click',()=> activate(b.getAttribute('data-tab')));
          b.addEventListener('keydown',e=>{
            const i=btns.indexOf(b);
            if(e.key==='ArrowRight'){ e.preventDefault(); (btns[i+1]||btns[0]).focus(); }
            if(e.key==='ArrowLeft'){ e.preventDefault(); (btns[i-1]||btns[btns.length-1]).focus(); }
          });
        });
      });
    },

    _initDialogs(){
      // open
      $$('.btn[data-open-modal]').forEach(btn=>{
        const sel=btn.getAttribute('data-open-modal');
        btn.addEventListener('click',()=> this._setDialog(sel,true));
      });
      $$('.btn[data-open-drawer]').forEach(btn=>{
        const sel=btn.getAttribute('data-open-drawer');
        btn.addEventListener('click',()=> this._setDialog(sel,true));
      });
      // close
      $$('[data-close]').forEach(el=>{
        el.addEventListener('click',()=>{
          const d = el.closest('.modal,.drawer');
          if (d) this._setDialog('#'+d.id,false);
        });
      });
      document.addEventListener('keydown', e=>{
        if(e.key==='Escape'){
          $$('.modal[aria-hidden="false"],.drawer[aria-hidden="false"]').forEach(d=> this._setDialog('#'+d.id,false));
        }
      });
    },
    _setDialog(sel, open){
      const el = document.querySelector(sel); if (!el) return;
      el.setAttribute('aria-hidden', String(!open));
      if(open){
        const f = el.querySelector('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
        f && f.focus();
      }
    },

    _initDropdowns(){
      const drops = $$('.dropdown[data-dropdown]');
      const closeAll = (except=null)=> drops.forEach(d=>{
        if(d===except) return;
        const btn=$('.dropdown-btn',d), menu=$('.dropdown-menu',d);
        btn&&btn.classList.remove('active'); btn&&btn.setAttribute('aria-expanded','false');
        menu&&menu.classList.remove('open'); menu&&menu.setAttribute('aria-hidden','true');
      });
      
      drops.forEach(drop=>{
        const btn = $('.dropdown-btn',drop);
        const menu = $('.dropdown-menu',drop);
        const items = $$('.dropdown-item',menu);
        const textDisplay = $('.dropdown-text',btn);
        
        if(!menu.id) menu.id = 'dropdown-menu-' + Math.random().toString(36).slice(2);
        btn.setAttribute('aria-controls', menu.id);
        
        // Toggle dropdown
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const willOpen = !btn.classList.contains('active');
          closeAll(willOpen ? drop : null);
          
          btn.classList.toggle('active', willOpen);
          menu.classList.toggle('open', willOpen);
          btn.setAttribute('aria-expanded', String(willOpen));
          menu.setAttribute('aria-hidden', String(!willOpen));
          
          if(willOpen && items.length > 0){
            const focused = items.find(item => item.classList.contains('selected'));
            (focused || items[0]).focus();
          }
        });
        
        // Handle menu items
        items.forEach((item, idx, list) => {
          const selectItem = e => {
            e.preventDefault();
            
            // Update display text
            textDisplay.textContent = item.textContent;
            
            // Update selection state
            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            
            // Set value for form compatibility
            const value = item.getAttribute('data-value');
            if(value){
              btn.setAttribute('data-value', value);
              btn.dispatchEvent(new CustomEvent('change', { detail: { value, text: item.textContent } }));
            }
            
            // Close dropdown
            btn.classList.remove('active');
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            btn.focus();
          };
          
          item.addEventListener('click', selectItem);
          item.addEventListener('keydown', e => {
            if(e.key === 'Enter' || e.key === ' '){
              selectItem(e);
            }
            if(e.key === 'ArrowDown'){
              e.preventDefault();
              const next = list[idx + 1] || list[0];
              next.focus();
            }
            if(e.key === 'ArrowUp'){
              e.preventDefault();
              const prev = list[idx - 1] || list[list.length - 1];
              prev.focus();
            }
            if(e.key === 'Home'){
              e.preventDefault();
              list[0].focus();
            }
            if(e.key === 'End'){
              e.preventDefault();
              list[list.length - 1].focus();
            }
            if(e.key === 'Escape'){
              e.preventDefault();
              btn.click();
            }
          });
        });
        
        // Keyboard navigation on button
        btn.addEventListener('keydown', e => {
          if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            btn.click();
          }
        });
      });
      
      // Click outside to close
      document.addEventListener('click', e => {
        if(!e.target.closest('.dropdown[data-dropdown]')) closeAll();
      });
      
      // Escape key to close
      document.addEventListener('keydown', e => {
        if(e.key === 'Escape') closeAll();
      });
    },

    toast(message, { tone } = {}){
      let root = document.getElementById('toast-root');
      if(!root){ root = document.createElement('div'); root.id='toast-root'; root.className='toast-root'; document.body.appendChild(root); }
      const el = document.createElement('div');
      el.className = 'toast' + (tone ? (' ' + tone) : '');
      el.textContent = message;
      root.appendChild(el);
      setTimeout(()=> el.remove(), 3500);
    }
  };

  window.IndieNeon = IndieNeon;
})();