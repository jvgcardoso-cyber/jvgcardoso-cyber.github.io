document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS CENTRALIZADOS DO PORTFÓLIO
    // Para adicionar/remover projetos, basta editar esta lista.
    const projectsData = [
        {
            id: 'proj1',
            title: 'ARMANI',
            description: 'Uma campanha focada na textura e elegância do novo batom matte da Armani.',
            coverImage: 'https://images.unsplash.com/photo-1620042222109-3733734e6210?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1590155206743-73c2164e2193?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1622182995420-2b1b5c1c8a1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            ]
        },
        {
            id: 'proj2',
            title: 'VOGUE',
            description: 'Editorial para a Vogue sobre a intersecção da forma humana com a natureza.',
            coverImage: 'https://images.unsplash.com/photo-1589991399596-1055a4756a18?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1589991399596-1055a4756a18?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1521577902-b25840228b3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1605557626786-0565b6d5f47e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
            ]
        },
        {
            id: 'proj3',
            title: 'CHLOE',
            description: 'Campanha de fragrância para a Chloe, capturando a essência da liberdade e do frescor.',
            coverImage: 'https://images.unsplash.com/photo-1595535373190-fc96a29d9448?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1595535373190-fc96a29d9448?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        }
    ];

    const projectList = document.querySelector('.project-list');
    const projectPreviewWrapper = document.querySelector('.image-wrapper');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    // 2. GERAÇÃO DINÂMICA DO CONTEÚDO
    projectsData.forEach(project => {
        // Cria o link na lista da esquerda
        const listItem = document.createElement('a');
        listItem.className = 'project-item';
        listItem.dataset.project = project.id;
        listItem.innerHTML = `<h1>${project.title}</h1>`;
        projectList.appendChild(listItem);

        // Cria a imagem de preview na direita
        const previewImage = document.createElement('img');
        previewImage.className = 'project-image';
        previewImage.src = project.coverImage;
        previewImage.dataset.project = project.id;
        previewImage.alt = project.title;
        projectPreviewWrapper.appendChild(previewImage);
    });

    // 3. LÓGICA DO SCROLL (INTERSECTION OBSERVER) - igual ao V2, mas com seletores atualizados
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Ativa o primeiro projeto por padrão
    projectImages[0].classList.add('active');
    projectItems[0].classList.add('is-visible');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectId = entry.target.dataset.project;
                projectImages.forEach(img => {
                    img.classList.toggle('active', img.dataset.project === projectId);
                });
                projectItems.forEach(item => {
                    item.classList.toggle('is-visible', item.dataset.project === projectId);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    projectItems.forEach(item => observer.observe(item));

    // 4. LÓGICA PARA ABRIR E FECHAR O MODAL
    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = item.dataset.project;
            const projectData = projectsData.find(p => p.id === projectId);
            openModal(projectData);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function openModal(project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        const gallery = document.getElementById('modalGallery');
        gallery.innerHTML = ''; // Limpa a galeria anterior

        project.gallery.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            gallery.appendChild(img);
        });

        document.body.classList.add('modal-open');
        modal.classList.add('active');
    }

    function closeModal() {
        document.body.classList.remove('modal-open');
        modal.classList.remove('active');
    }
});
