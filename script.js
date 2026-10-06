/**
 * TYSON Media Group — 100 Subscribers Milestone Celebration
 * Orchestration controller: Signature vector trace, unified phrase illumination,
 * crossfade engine, and soundtrack sync (Brothertiger - Tide Pool @ 3:30 - 4:30).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Stage elements
    const stage1 = document.getElementById('stage-1');
    const stage2 = document.getElementById('stage-2');
    const stage3 = document.getElementById('stage-3');
    const stage4 = document.getElementById('stage-4');
    const stage5 = document.getElementById('stage-5');
    
    // Finale phrases
    const phraseSubscribers = document.getElementById('phrase-subscribers');
    const phraseThankYou = document.getElementById('phrase-thankyou');
    
    // Stage wrapper
    const animationStage = document.getElementById('animation-stage');
    
    // Controls
    const btnReplay = document.getElementById('btn-replay');
    const btnSound = document.getElementById('btn-sound');
    const iconSoundOff = document.getElementById('icon-sound-off');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const soundLabel = document.getElementById('sound-label');
    const audio = document.getElementById('audio-soundtrack');

    let currentTimeoutIds = [];
    let isRunning = false;
    let isAudioPlaying = false;

    // Helper: Register a cancellable timer
    function wait(ms) {
        return new Promise(resolve => {
            const id = setTimeout(resolve, ms);
            currentTimeoutIds.push(id);
        });
    }

    // Clear all pending timers
    function clearAllTimers() {
        currentTimeoutIds.forEach(id => clearTimeout(id));
        currentTimeoutIds = [];
    }

    // Cleanly reset an individual stage
    function resetStage(stageElement) {
        if (!stageElement) return;
        stageElement.classList.remove('active', 'animating', 'fade-out', 'slow-fade-out');
    }

    // Force DOM reflow on a stage so animations restart reliably
    function forceReflow(el) {
        void el.offsetWidth;
    }

    // Reset experience completely
    function resetAll() {
        clearAllTimers();
        isRunning = false;

        [stage1, stage2, stage3, stage4, stage5].forEach(resetStage);

        if (phraseSubscribers) {
            phraseSubscribers.classList.remove('visible', 'dissolve-out');
        }
        if (phraseThankYou) {
            phraseThankYou.classList.remove('visible');
        }

        [stage1, stage2, stage3, stage4, stage5].forEach(forceReflow);
    }

    /**
     * Main Choreography:
     * 1. "100" (Borg 9 font) traces out letter-by-letter, illuminates together, holds, fades out
     * 2. "2,199 days" (Non-Italic Thin Cormorant Garamond) traces, illuminates together, holds, fades out
     * 3. "80 videos" (Non-Italic Thin Cormorant Garamond) traces, illuminates together, holds, fades out
     * 4. "14,140 views" (Non-Italic Thin Cormorant Garamond) traces, illuminates together, holds, slowly fades out
     * 5. "100 Subscribers" fades in gracefully, holds proudly, then slow-crossfades into "Thank You"
     */
    async function playSequence() {
        resetAll();
        isRunning = true;

        // Sync soundtrack to beginning of 3:30 timestamp clip on each play/replay
        if (audio && isAudioPlaying) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }

        await wait(300);
        if (!isRunning) return;

        // Stage 1: "100" (Borg 9)
        forceReflow(stage1);
        stage1.classList.add('active', 'animating');
        await wait(2800); // 1.45s trace+fill + 1.35s hold
        stage1.classList.add('fade-out');
        await wait(950);  // Fade out duration
        resetStage(stage1);

        if (!isRunning) return;

        // Stage 2: "2,199 days" (Thin Garamond)
        forceReflow(stage2);
        stage2.classList.add('active', 'animating');
        await wait(2900); // 1.50s trace+fill + 1.40s hold
        stage2.classList.add('fade-out');
        await wait(950);
        resetStage(stage2);

        if (!isRunning) return;

        // Stage 3: "80 videos" (Thin Garamond)
        forceReflow(stage3);
        stage3.classList.add('active', 'animating');
        await wait(2850); // 1.45s trace+fill + 1.40s hold
        stage3.classList.add('fade-out');
        await wait(950);
        resetStage(stage3);

        if (!isRunning) return;

        // Stage 4: "14,140 views" (Thin Garamond)
        forceReflow(stage4);
        stage4.classList.add('active', 'animating');
        await wait(3100); // 1.65s trace+fill + 1.45s hold
        // "Then slowly fades out"
        stage4.classList.add('slow-fade-out');
        await wait(2200); // Deliberate slow fade-out duration
        resetStage(stage4);

        if (!isRunning) return;

        // Stage 5: Pause in darkness before finale
        await wait(800);
        if (!isRunning) return;

        // "fades in 100 Subscribers"
        forceReflow(stage5);
        stage5.classList.add('active');
        phraseSubscribers.classList.add('visible');
        await wait(3000); // Extended hold on 100 Subscribers

        if (!isRunning) return;

        // "and crossfades into 'Thank You'"
        phraseSubscribers.classList.add('dissolve-out');
        phraseThankYou.classList.add('visible');

        isRunning = false;
    }

    // Launch sequence automatically when page loads
    setTimeout(playSequence, 400);

    // Replay on button click
    btnReplay.addEventListener('click', (e) => {
        e.stopPropagation();
        playSequence();
    });

    // Replay when clicking anywhere on the stage
    if (animationStage) {
        animationStage.addEventListener('click', () => {
            playSequence();
        });
    }

    // Keyboard shortcut (Space or R) to replay
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
            e.preventDefault();
            playSequence();
        }
    });

    // Sound toggle controller: Tide Pool (3:30 - 4:30)
    if (audio && btnSound) {
        audio.volume = 0.65;
        audio.loop = true; // Loops the 3:30 - 4:30 atmosphere seamlessly

        btnSound.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isAudioPlaying) {
                audio.currentTime = 0;
                audio.play().then(() => {
                    isAudioPlaying = true;
                    iconSoundOff.style.display = 'none';
                    iconSoundOn.style.display = 'block';
                    soundLabel.textContent = 'Mute';
                }).catch(err => {
                    console.log('Audio playback prevented:', err);
                });
            } else {
                audio.pause();
                isAudioPlaying = false;
                iconSoundOff.style.display = 'block';
                iconSoundOn.style.display = 'none';
                soundLabel.textContent = 'Sound';
            }
        });
    }
});
