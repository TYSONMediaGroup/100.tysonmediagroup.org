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

    // Configure animation delays for characters based on their data-delay attribute
    function configureCharDelays(stageElement, fillDelayOffset = 0.65) {
        if (!stageElement) return;
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(char => {
            const drawDelay = parseFloat(char.getAttribute('data-delay') || '0');
            const fillDelay = drawDelay + fillDelayOffset;
            char.style.animationDelay = `${drawDelay}s, ${fillDelay}s`;
        });
    }

    // Configure all trace stages with smooth deliberate delays
    configureCharDelays(stage1, 0.70);
    configureCharDelays(stage2, 0.65);
    configureCharDelays(stage3, 0.65);
    configureCharDelays(stage4, 0.65);

    // Reset an individual stage element
    function resetStage(stageElement) {
        if (!stageElement) return;
        stageElement.classList.remove('active', 'animating', 'filled', 'fade-out', 'slow-fade-out');
        const chars = stageElement.querySelectorAll('.trace-char');
        chars.forEach(ch => {
            ch.style.animation = 'none';
            void ch.offsetWidth; // Force DOM reflow
            ch.style.animation = '';
        });
    }

    // Reset the full experience to pristine starting conditions
    function resetAll() {
        clearAllTimers();
        isRunning = false;

        [stage1, stage2, stage3, stage4, stage5].forEach(resetStage);

        // Re-apply char animation delays
        configureCharDelays(stage1, 0.70);
        configureCharDelays(stage2, 0.65);
        configureCharDelays(stage3, 0.65);
        configureCharDelays(stage4, 0.65);

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
     * Executes the refined animation choreography:
     * 1. Traces out and fills in "100" (Borg 9 font), holds, then fades out
     * 2. Traces in "2,199 days" (Thin Non-Italic Cormorant Garamond), holds, then fades out
     * 3. Traces in "80 videos" (Thin Non-Italic Cormorant Garamond), holds, then fades out
     * 4. Traces in "14,140 views" (Thin Non-Italic Cormorant Garamond), holds, then slowly fades out
     * 5. Fades in "100 Subscribers" gracefully, holds, and crossfades into "Thank You"
     */
    async function playSequence() {
        resetAll();
        isRunning = true;

        // Brief atmospheric breath before start
        await wait(250);
        if (!isRunning) return;

        // Stage 1: "100" in Borg 9
        stage1.classList.add('active', 'animating');
        await wait(1350); // Trace & fill duration
        stage1.classList.add('filled');
        await wait(1300); // Hold for visual appreciation
        stage1.classList.add('fade-out');
        await wait(950);  // Smooth fade-out
        resetStage(stage1);

        if (!isRunning) return;

        // Stage 2: "2,199 days" in Non-Italic Thin Cormorant Garamond
        stage2.classList.add('active', 'animating');
        await wait(1700); // Calligraphy trace & fill
        stage2.classList.add('filled');
        await wait(1350); // Hold
        stage2.classList.add('fade-out');
        await wait(950);
        resetStage(stage2);

        if (!isRunning) return;

        // Stage 3: "80 videos" in Non-Italic Thin Cormorant Garamond
        stage3.classList.add('active', 'animating');
        await wait(1600); // Trace & fill
        stage3.classList.add('filled');
        await wait(1350); // Hold
        stage3.classList.add('fade-out');
        await wait(950);
        resetStage(stage3);

        if (!isRunning) return;

        // Stage 4: "14,140 views" in Non-Italic Thin Cormorant Garamond
        stage4.classList.add('active', 'animating');
        await wait(1850); // Trace & fill
        stage4.classList.add('filled');
        await wait(1400); // Hold
        // Slow cinematic fade-out into dark
        stage4.classList.add('slow-fade-out');
        await wait(1900); // Deliberate, slow fade-out duration
        resetStage(stage4);

        if (!isRunning) return;

        // Stage 5: Pause in darkness before finale
        await wait(600);
        if (!isRunning) return;

        // Fade in "100 Subscribers"
        stage5.classList.add('active');
        phraseSubscribers.classList.add('visible');
        await wait(2500); // Meaningful, proud hold on 100 Subscribers

        if (!isRunning) return;

        // Slow cinematic crossfade into "Thank You"
        phraseSubscribers.classList.add('dissolve-out');
        phraseThankYou.classList.add('visible');
        await wait(1800); // Crossfade duration

        // Reveal header banner, Perspective in Motion, and italic tysonmediagroup.org footer
        stageHeader.classList.add('revealed');
        stageFooter.classList.add('revealed');

        isRunning = false;
    }

    // Font-ready gatekeeper with safety fallback
    function init() {
        const fontBorgPromise = (document.fonts && document.fonts.load)
            ? document.fonts.load('120px "Borg 9"')
            : Promise.resolve();

        const fontGaramondPromise = (document.fonts && document.fonts.load)
            ? document.fonts.load('300 80px "Cormorant Garamond"')
            : Promise.resolve();

        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 500));

        // Start sequence as soon as fonts are ready or after 500ms fallback
        Promise.race([
            Promise.all([
                fontBorgPromise,
                fontGaramondPromise,
                (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve()
            ]),
            timeoutPromise
        ]).then(() => {
            playSequence();
        }).catch(() => {
            playSequence();
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
