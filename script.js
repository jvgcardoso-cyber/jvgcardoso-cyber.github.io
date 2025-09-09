document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS CENTRALIZADOS DO PORTFÓLIO (COM IMAGENS DE EXEMPLO)
    const projectsData = [
        {
            id: 'proj1',
            title: 'ARMANI',
            description: 'Uma campanha focada na textura e elegância do novo batom matte da Armani.',
            coverImage: 'https://cdn.cosmos.so/0d9fff45-13c7-4e30-b5b7-784ee56c7ff9?format=jpeg',
            gallery: [
                'https://images.unsplash.com/photo-1590155206743-73c2164e2193?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1622182995420-2b1b5c1c8a1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1599305103455-336a5f78b97e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj2',
            title: 'VOGUE',
            description: 'Editorial para a Vogue sobre a intersecção da forma humana com a natureza.',
            coverImage: './assets/vogue-capa.jpg',
            gallery: [
                './assets/vogue-capa.jpg',
                'https://images.unsplash.com/photo-1605557626786-0565b6d5f47e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1517686749232-d0e3a478c99d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj3',
            title: 'CHLOE',
            description: 'Campanha de fragrância para a Chloe, capturando a essência da liberdade e do frescor.',
            coverImage: 'https://cdn.cosmos.so/69046fb3-0544-483d-b419-983cc66755f9.?format=jpeg',
            gallery: [
                'https://images.unsplash.com/photo-1557128362-9a25785f2373?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1627993099209-a720618b765a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj4',
            title: 'TYPOLOGY',
            description: 'Fotografia de produto minimalista para a marca de skincare Typology.',
            coverImage: 'https://images.unsplash.com/photo-1617823902316-222a762b664f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1617823902316-222a762b664f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1619451426448-b3f339b6b7a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        }
    ];

    const projectList = document.querySelector('.project-list');
    const projectPreviewWrapper = document.querySelector('.image-wrapper');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    // 2. GERAÇÃO DINÂMICA DO CONTEÚDO
    if (projectsData.length > 0) {
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
    }

    // 3. LÓGICA DO SCROLL (INTERSECTION OBSERVER)
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Ativa o primeiro projeto por padrão, APENAS se existirem projetos
    if (projectItems.length > 0 && projectImages.length > 0) {
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
                if (projectData) {
                    openModal(projectData);
                }
            });
        });
    }

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
        gallery.innerHTML = '';

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
});document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS CENTRALIZADOS DO PORTFÓLIO (COM IMAGENS DE EXEMPLO)
    const projectsData = [
        {
            id: 'proj1',
            title: 'ARMANI',
            description: 'Uma campanha focada na textura e elegância do novo batom matte da Armani.',
            coverImage: 'https://images.unsplash.com/photo-1620042222109-3733734e6210?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1590155206743-73c2164e2193?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1622182995420-2b1b5c1c8a1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1599305103455-336a5f78b97e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj2',
            title: 'VOGUE',
            description: 'Editorial para a Vogue sobre a intersecção da forma humana com a natureza.',
            coverImage: 'https://instagram.fcgh65-1.fna.fbcdn.net/v/t51.29350-15/310868122_659930102140579_4806699279564586596_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fcgh65-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QEjzjsjvndi6b3HTs04e43rOk-GTEPQhh583WnKBEQ4iRd4clZD3kDekA5ee4ZAR3Fn-uqhhMqWaGUAXiHXaJrz&_nc_ohc=umiPsaSF81EQ7kNvwHg7nED&_nc_gid=qwnt-nXjREJrx2i_uZqiEA&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=Mjk0NTU3MzgxNjM5MTgwMTE5Nw%3D%3D.3-ccb7-5&oh=00_AfY_40iDS0Tk-aWtWf4Px50uO1hVKOkrvCGef4CtfLITEw&oe=68C564AE&_nc_sid=22de04',
            gallery: [
                'https://images.unsplash.com/photo-1521577902-b25840228b3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1605557626786-0565b6d5f47e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1517686749232-d0e3a478c99d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj3',
            title: 'CHLOE',
            description: 'Campanha de fragrância para a Chloe, capturando a essência da liberdade e do frescor.',
            coverImage: 'https://images.unsplash.com/photo-1595535373190-fc96a29d9448?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1557128362-9a25785f2373?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1627993099209-a720618b765a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        },
        {
            id: 'proj4',
            title: 'TYPOLOGY',
            description: 'Fotografia de produto minimalista para a marca de skincare Typology.',
            coverImage: 'https://images.unsplash.com/photo-1617823902316-222a762b664f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
            gallery: [
                'https://images.unsplash.com/photo-1617823902316-222a762b664f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
                'https://images.unsplash.com/photo-1619451426448-b3f339b6b7a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
            ]
        }
    ];

    const projectList = document.querySelector('.project-list');
    const projectPreviewWrapper = document.querySelector('.image-wrapper');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    // 2. GERAÇÃO DINÂMICA DO CONTEÚDO
    if (projectsData.length > 0) {
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
    }

    // 3. LÓGICA DO SCROLL (INTERSECTION OBSERVER)
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Ativa o primeiro projeto por padrão, APENAS se existirem projetos
    if (projectItems.length > 0 && projectImages.length > 0) {
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
                if (projectData) {
                    openModal(projectData);
                }
            });
        });
    }

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
        gallery.innerHTML = '';

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
