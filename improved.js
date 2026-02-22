// Smooth scrolling and active nav highlight
document.addEventListener('DOMContentLoaded',()=>{
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href')||'';
      // Only intercept in-page anchor links (starting with '#')
      if(href.startsWith('#')){
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if(!el) return;
        el.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',`#${id}`);
      }
      // otherwise allow normal navigation to other pages
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      const id = en.target.id;
      const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
      if(en.isIntersecting){
        navLink && navLink.classList.add('active');
      } else {
        navLink && navLink.classList.remove('active');
      }
    });
  },{threshold:0.5});
  sections.forEach(s=>obs.observe(s));
});
