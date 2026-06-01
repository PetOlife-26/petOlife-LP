function generatePetCode() {
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `POL-2026-${suffix}`;
}

module.exports = generatePetCode;
