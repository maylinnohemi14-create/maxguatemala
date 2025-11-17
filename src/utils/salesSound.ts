// Create a sales sound effect using Web Audio API
export const playSalesSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillators for a pleasant "cha-ching" sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure first note (higher pitch)
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    // Configure second note (lower pitch for harmony)
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
    
    // Configure volume envelope
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    // Connect the audio graph
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play the sound
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    
    // Stop after the sound completes
    oscillator1.stop(audioContext.currentTime + 0.3);
    oscillator2.stop(audioContext.currentTime + 0.3);
    
    // Clean up
    setTimeout(() => {
      audioContext.close();
    }, 400);
  } catch (error) {
    console.error('Error playing sales sound:', error);
  }
};
