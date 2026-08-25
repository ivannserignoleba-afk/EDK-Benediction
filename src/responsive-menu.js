/* Hamburger EDK Bénédiction : transforme le menu desktop en menu mobile. */
(function(){
  function initMenu(){
    const header=document.querySelector('header');
    const nav=header && header.querySelector('nav');
    if(!header || !nav) return false;
    if(document.getElementById('edk-menu-btn')) return true;

    nav.classList.add('edk-mobile-nav');

    const button=document.createElement('button');
    button.id='edk-menu-btn';
    button.className='edk-hamburger';
    button.type='button';
    button.setAttribute('aria-label','Ouvrir le menu');
    button.setAttribute('aria-expanded','false');
    button.innerHTML='<span></span><span></span><span></span>';

    header.appendChild(button);

    const closeMenu=()=>{
      nav.classList.remove('open');
      button.classList.remove('active');
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-label','Ouvrir le menu');
    };

    button.addEventListener('click',function(){
      const open=nav.classList.toggle('open');
      button.classList.toggle('active',open);
      button.setAttribute('aria-expanded',String(open));
      button.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
    });

    nav.querySelectorAll('a,button').forEach(function(link){
      link.addEventListener('click',closeMenu);
    });

    window.addEventListener('resize',function(){
      if(window.innerWidth>800) closeMenu();
    });

    document.addEventListener('click',function(event){
      if(window.innerWidth<=800 && nav.classList.contains('open') && !header.contains(event.target)){
        closeMenu();
      }
    });

    return true;
  }

  if(!initMenu()){
    const observer=new MutationObserver(function(){
      if(initMenu()) observer.disconnect();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){observer.disconnect();initMenu()},10000);
  }
})();
