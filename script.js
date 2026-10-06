/**
 * TYSON Media Group — 100 Subscribers Milestone Celebration
 * Orchestration controller: Signature vector trace, unified phrase fill, and crossfade engine.
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

    // Clear all pending timeouts
    function clearAllTimers() {
        currentTimeoutIds.forEach(id => clearTimeout(id));
        currentTimeoutIds = [];
    }

    /**
     * Configure characters so they draw sequentially one-by-one,
     * and then the whole phrase washes in with solid white fill simultaneously!
     */
    function configureStageDelays(stageElement, unifiedFillDelay) {
        if (!stageElement) return;
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(char => {
            const drawDelay = parseFloat(char.getAttribute('data-delay') || '0');
            char.style.animationDelay = `${drawDelay}s, ${unifiedFillDelay}s`;
        });
    }

    // Setup signature timing: sequential pen drawing + simultaneous phrase fill
    function setupAllStageDelays() {
        configureStageDelays(stage1, 0.95);  // "100" fills at 0.95s
        configureStageDelays(stage2, 1.25);  // "2,199 days" fills at 1.25s
        configureStageDelays(stage3, 1.15);  // "80 videos" fills at 1.15s
        configureStageDelays(stage4, 1.40);  // "14,140 views" fills at 1.40s
    }

    setupAllStageDelays();

    // Reset an individual stage element
    function resetStage(stageElement) {
        if (!stageElement) return;
        stageElement.classList.remove('active', 'animating', 'fade-out', 'slow-fade-out');
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(ch => {
            ch.style.animation = 'none';
            void ch.offsetWidth; // Force reflow
            ch.style.animation = '';
        });
    }

    // Reset experience
    function resetAll() {
        clearAllTimers();
        isRunning = false;

        [stage1, stage2, stage3, stage4, stage5].forEach(resetStage);
        setupAllStageDelays();

        if (phraseSubscribers) {
            phraseSubscribers.classList.remove('visible', 'dissolve-out');
        }
        if (phraseThankYou) {
            phraseThankYou.classList.remove('visible');
        }
    }

    /**
     * Main Choreography:
     * 1. "100" (Borg 9 font) traces out letter-by-letter, fills together, holds, fades out
     * 2. "2,199 days" (Non-Italic Thin Cormorant Garamond) traces, fills together, holds, fades out
     * 3. "80 videos" (Non-Italic Thin Cormorant Garamond) traces, fills together, holds, fades out
     * 4. "14,140 views" (Non-Italic Thin Cormorant Garamond) traces, fills together, holds, slowly fades out
     * 5. "100 Subscribers" fades in gracefully, holds proudly, then slow-crossfades into "Thank You"
     */
    async function playSequence() {
        resetAll();
        isRunning = true;

        await wait(300);
        if (!isRunning) return;

        // Stage 1: "100" (Borg 9)
        stage1.classList.add('active', 'animating');
        await wait(2200); // 0.95s trace+fill + 1.25s hold
        stage1.classList.add('fade-out');
        await wait(900);
        resetStage(stage1);

        if (!isRunning) return;

        // Stage 2: "2,199 days" (Thin Garamond)
        stage2.classList.add('active', 'animating');
        await wait(2600); // 1.25s trace+fill + 1.35s hold
        stage2.classList.add('fade-out');
        await wait(900);
        resetStage(stage2);

        if (!isRunning) return;

        // Stage 3: "80 videos" (Thin Garamond)
        stage3.classList.add('active', 'animating');
        await wait(2500); // 1.15s trace+fill + 1.35s hold
        stage3.classList.add('fade-out');
        await wait(900);
        resetStage(stage3);

        if (!isRunning) return;

        // Stage 4: "14,140 views" (Thin Garamond)
        stage4.classList.add('active', 'animating');
        await wait(2800); // 1.40s trace+fill + 1.40s hold
        // "Then slowly fades out"
        stage4.classList.add('slow-fade-out');
        await wait(2100); // Slow cinematic fade-out duration
        resetStage(stage4);

        if (!isRunning) return;

        // Stage 5: Pause in darkness
        await wait(700);
        if (!isRunning) return;

        // "fades in 100 Subscribers"
        stage5.classList.add('active');
        phraseSubscribers.classList.add('visible');
        await wait(2800); // Extended hold on 100 Subscribers

        if (!isRunning) return;

        // "and crossfades into 'Thank You'"
        phraseSubscribers.classList.add('dissolve-out');
        phraseThankYou.classList.add('visible');

        isRunning = false;
    }

    // Launch sequence automatically
    setTimeout(playSequence, 400);

    // Replay interaction
    btnReplay.addEventListener('click', () => {
        playSequence();
    });

    // Keyboard shortcut (Space or R) to replay
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
            e.preventDefault();
            playSequence();
        }
    });

    // Sound toggle controller
    if (audio && btnSound) {
        audio.volume = 0.5;

        btnSound.addEventListener('click', () => {
            if (!isAudioPlaying) {
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
