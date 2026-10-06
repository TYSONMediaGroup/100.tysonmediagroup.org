/**
 * TYSON Media Group — 100 Subscribers Milestone Celebration
 * Orchestration controller: Vector trace sequence, font loader guard, and crossfade engine.
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
    
    // UI Chrome
    const stageHeader = document.getElementById('stage-header');
    const stageFooter = document.getElementById('stage-footer');
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

    // Setup animation delays for trace characters
    function configureCharDelays(stageElement, fillDelayOffset = 0.55) {
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(char => {
            const drawDelay = parseFloat(char.getAttribute('data-delay') || '0');
            const fillDelay = drawDelay + fillDelayOffset;
            char.style.animationDelay = `${drawDelay}s, ${fillDelay}s`;
        });
    }

    // Configure all trace stages
    configureCharDelays(stage1, 0.45);
    configureCharDelays(stage2, 0.55);
    configureCharDelays(stage3, 0.55);
    configureCharDelays(stage4, 0.55);

    // Reset a stage's visual state completely
    function resetStage(stageElement) {
        if (!stageElement) return;
        stageElement.classList.remove('active', 'animating', 'filled', 'fade-out', 'slow-fade-out');
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(ch => {
            ch.style.animation = 'none';
            void ch.offsetWidth; // trigger reflow
            ch.style.animation = '';
        });
    }

    // Reset everything to pristine initial state
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

        stageHeader.classList.remove('revealed');
        stageFooter.classList.remove('revealed');
    }

    /**
     * Executes the requested 5-stage animation choreography:
     * 1. Traces out and fills in "100" (Borg 9 font), then fades out
     * 2. Traces in "2,199 days" (Cormorant Garamond), then fades out
     * 3. Traces in "80 videos" (Cormorant Garamond), then fades out
     * 4. Traces in "14,140 views" (Cormorant Garamond), then slowly fades out
     * 5. Fades in "100 Subscribers" and crossfades into "Thank You"
     */
    async function playSequence() {
        resetAll();
        isRunning = true;

        // Stage 1: "100" in Borg 9
        stage1.classList.add('active', 'animating');
        await wait(750); // char tracing & fill
        stage1.classList.add('filled');
        await wait(850); // display hold
        stage1.classList.add('fade-out');
        await wait(650); // fade out duration
        resetStage(stage1);

        if (!isRunning) return;

        // Stage 2: "2,199 days" in Cormorant Garamond
        stage2.classList.add('active', 'animating');
        await wait(1250); // calligraphy trace & fill
        stage2.classList.add('filled');
        await wait(800); // display hold
        stage2.classList.add('fade-out');
        await wait(650);
        resetStage(stage2);

        if (!isRunning) return;

        // Stage 3: "80 videos" in Cormorant Garamond
        stage3.classList.add('active', 'animating');
        await wait(1150); // trace & fill
        stage3.classList.add('filled');
        await wait(800); // display hold
        stage3.classList.add('fade-out');
        await wait(650);
        resetStage(stage3);

        if (!isRunning) return;

        // Stage 4: "14,140 views" in Cormorant Garamond
        stage4.classList.add('active', 'animating');
        await wait(1350); // trace & fill
        stage4.classList.add('filled');
        await wait(900); // display hold
        // "Then slowly fades out"
        stage4.classList.add('slow-fade-out');
        await wait(1400); // slow fade out duration
        resetStage(stage4);

        if (!isRunning) return;

        // Stage 5: "100 Subscribers" fades in, then crossfades into "Thank You"
        stage5.classList.add('active');
        phraseSubscribers.classList.add('visible');
        await wait(1600); // hold 100 Subscribers

        if (!isRunning) return;

        // Crossfade: subscribers dissolves out, Thank You emerges
        phraseSubscribers.classList.add('dissolve-out');
        phraseThankYou.classList.add('visible');
        await wait(1100);

        // Reveal branding & controls gently
        stageHeader.classList.add('revealed');
        stageFooter.classList.add('revealed');

        isRunning = false;
    }

    // Font-ready gatekeeper before starting sequence
    function init() {
        const fontBorgPromise = (document.fonts && document.fonts.load)
            ? document.fonts.load('120px "Borg 9"')
            : Promise.resolve();

        const fontGaramondPromise = (document.fonts && document.fonts.load)
            ? document.fonts.load('italic 80px "Cormorant Garamond"')
            : Promise.resolve();

        Promise.all([
            fontBorgPromise,
            fontGaramondPromise,
            (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve()
        ]).then(() => {
            // Short initial atmospheric pause before launching
            setTimeout(playSequence, 350);
        }).catch(() => {
            setTimeout(playSequence, 350);
        });
    }

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

    // Launch
    init();
});
