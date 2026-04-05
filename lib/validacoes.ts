export function validarCPF(cpf: string): boolean {
  const nums = cpf.replace(/\D/g, "")
  if (nums.length !== 11 || /^(\d)\1+$/.test(nums)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += Number(nums[i]) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== Number(nums[9])) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += Number(nums[i]) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  return resto === Number(nums[10])
}

export function validarCNPJ(cnpj: string): boolean {
  const nums = cnpj.replace(/\D/g, "")
  if (nums.length !== 14 || /^(\d)\1+$/.test(nums)) return false
  const calc = (n: string, pos: number[]) => {
    const soma = pos.reduce((acc, p, i) => acc + Number(n[i]) * p, 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  const d1 = calc(nums, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const d2 = calc(nums, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return d1 === Number(nums[12]) && d2 === Number(nums[13])
}

export function detectarTipoDoc(doc: string): "CPF" | "CNPJ" {
  return doc.replace(/\D/g, "").length <= 11 ? "CPF" : "CNPJ"
}

export function validarDocumento(doc: string): boolean {
  const tipo = detectarTipoDoc(doc)
  return tipo === "CPF" ? validarCPF(doc) : validarCNPJ(doc)
}

export const CIDADES_COBERTURA = ["Itu", "Salto", "Indaiatuba", "Sorocaba", "Porto Feliz"]

export function validarCidade(cidade: string): boolean {
  return CIDADES_COBERTURA.includes(cidade)
}

export const LIMITES = {
  CPF:  { anuncios: 2, fotos: 4 },
  CNPJ: { anuncios: 6, fotos: 6 },
}
