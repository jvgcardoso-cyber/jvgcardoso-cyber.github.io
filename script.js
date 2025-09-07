document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.project-image');

    // Ativa a primeira imagem por padrão
    const firstProjectId = projectItems[0].dataset.project;
    document.querySelector(`.project-image[data-project="${firstProjectId}"]`).classList.add('active');
    projectItems[0].classList.add('is-visible');

    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Ativa quando o item está no centro vertical da tela
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const projectId = entry.target.dataset.project;
            const projectImage = document.querySelector(`.project-image[data-project="${projectId}"]`);

            if (entry.isIntersecting) {
                // Remove 'active' de todas as outras imagens
                projectImages.forEach(img => {
                    if (img !== projectImage) {
                        img.classList.remove('active');
                    }
                });
                // Adiciona 'active' à imagem correspondente
                projectImage.classList.add('active');

                // Atualiza o estilo do texto
                projectItems.forEach(item => item.classList.remove('is-visible'));
                entry.target.classList.add('is-visible');
            }
        });
    }, options);

    // Observa cada item de projeto na lista
    projectItems.forEach(item => {
        observer.observe(item);
    });
});
