// document.addEventListener('DOMContentLoaded', () => {
//     const gameCoin = document.querySelector('.game-coin');
//     const initialSrc = 'img/coin1.png';
//     const grabbedSrc = 'img/coin2.png';
//     let isDragging = false;

//     gameCoin.addEventListener('mousedown', (e) => {
//         isDragging = true;
//         gameCoin.src = grabbedSrc;

//         const rect = gameCoin.getBoundingClientRect();
//         const offsetX = e.clientX - (rect.width);
//         const offsetY = e.clientY - (rect.height);

//         function mouseMoveHandler(e) {
//             if (!isDragging) return;

//             gameCoin.style.position = 'absolute';
//             gameCoin.style.left = `${e.clientX - offsetX}px`;
//             gameCoin.style.top = `${e.clientY - offsetY}px`;
//         }

//         function mouseUpHandler() {
//             isDragging = false;
//             gameCoin.src = initialSrc;
//             gameCoin.style.position = '';
//             gameCoin.style.left = '';
//             gameCoin.style.top = '';
            
//             document.removeEventListener('mousemove', mouseMoveHandler);
//             document.removeEventListener('mouseup', mouseUpHandler);
//         }

//         document.addEventListener('mousemove', mouseMoveHandler);
//         document.addEventListener('mouseup', mouseUpHandler);
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const gameCoin = document.querySelector('.game-coin');
//     const container = document.querySelector('.container');
//     const slot = document.querySelector('.machine');
//     const initialSrc = 'img/coin1.png';
//     const grabbedSrc = 'img/coin2.png';
//     let isDragging = false;

//     gameCoin.addEventListener('mousedown', (e) => {
//         if (e.button !== 0) return;
//         isDragging = true;
//         gameCoin.src = grabbedSrc;

//         const offsetX = e.clientX - gameCoin.getBoundingClientRect().width;
//         const offsetY = e.clientY - gameCoin.getBoundingClientRect().height;

//         gameCoin.style.pointerEvents = 'none';

//         function mouseMoveHandler(e) {
//             if (!isDragging) return;

//             gameCoin.style.left = `${e.clientX - offsetX}px`;
//             gameCoin.style.top = `${e.clientY - offsetY}px`;
//         }

//         function mouseUpHandler() {
//             isDragging = false;
//             gameCoin.src = initialSrc;
//             gameCoin.style.pointerEvents = 'auto';
            
//             const coinRect = gameCoin.getBoundingClientRect();
//             const slotRect = slot.getBoundingClientRect();

//             const isOverSlot = (
//                 coinRect.left < slotRect.right &&
//                 coinRect.right > slotRect.left &&
//                 coinRect.top < slotRect.bottom &&
//                 coinRect.bottom > slotRect.top
//             );

//             if (isOverSlot) {
//                 container.style.display = 'none';
//             }

//             gameCoin.style.position = '';
//             gameCoin.style.left = '';
//             gameCoin.style.top = '';
            
//             document.removeEventListener('mousemove', mouseMoveHandler);
//             document.removeEventListener('mouseup', mouseUpHandler);
//         }

//         document.addEventListener('mousemove', mouseMoveHandler);
//         document.addEventListener('mouseup', mouseUpHandler);
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const gameCoin = document.querySelector('.game-coin');
    const container = document.querySelector('.container');
    const slot = document.querySelector('.machine');
    const initialSrc = 'img/coin1.png';
    const grabbedSrc = 'img/coin2.png';
    let isDragging = false;

    // mouse 和 touch 的事件
    function startDrag(e) {
        if (e.type === 'mousedown' && e.button !== 0) return;

        isDragging = true;
        gameCoin.src = grabbedSrc;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const offsetX = clientX - gameCoin.getBoundingClientRect().width;
        const offsetY = clientY - gameCoin.getBoundingClientRect().height;

        gameCoin.style.pointerEvents = 'none';

        gameCoin.style.position = 'absolute';

        function moveHandler(e) {
            if (!isDragging) return;

            const moveX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const moveY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            gameCoin.style.left = `${moveX - offsetX}px`;
            gameCoin.style.top = `${moveY - offsetY}px`;

            console.log(`Coin position: left = ${gameCoin.style.left}, top = ${gameCoin.style.top}`);

            e.preventDefault();
        }

        function endDragHandler(e) {
            isDragging = false;
            gameCoin.src = initialSrc;

            gameCoin.style.pointerEvents = 'auto';

            const coinRect = gameCoin.getBoundingClientRect();
            const slotRect = slot.getBoundingClientRect();

            const isOverSlot = (
                coinRect.left < slotRect.right &&
                coinRect.right > slotRect.left &&
                coinRect.top < slotRect.bottom &&
                coinRect.bottom > slotRect.top
            );

            if (isOverSlot) {
                container.style.display = 'none';
            }

            gameCoin.style.position = '';
            gameCoin.style.left = '';
            gameCoin.style.top = '';

            console.log(`Coin final position: left = ${gameCoin.style.left}, top = ${gameCoin.style.top}`);

            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', endDragHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', endDragHandler);
        }
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', endDragHandler);
        document.addEventListener('touchmove', moveHandler, { passive: false });
        document.addEventListener('touchend', endDragHandler);
    }

    gameCoin.addEventListener('mousedown', startDrag);
    gameCoin.addEventListener('touchstart', startDrag);
});


