import React, { useState, useMemo, useCallback } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { useSupabaseBriefing } from '../hooks/useSupabaseBriefing';

// Movidos para fora do componente para evitar recriação desnecessária e problemas com dependências de Hooks
const industries = [
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'ecommerce', label: 'E-commerce / Varejo Online' },
  { value: 'servicos', label: 'Serviços Profissionais' },
  { value: 'agencia', label: 'Agência Digital / Marketing' },
  { value: 'educacao', label: 'Educação / Cursos Online' },
  { value: 'saude', label: 'Saúde / Wellness' },
  { value: 'real_estate', label: 'Imóveis / Real Estate' },
  { value: 'alimentacao', label: 'Alimentação / Restaurante' },
  { value: 'varejo', label: 'Varejo Físico' },
  { value: 'outro', label: 'Outro' }
];

const toneExamples = {
  generic: "Exemplo genérico: 'Formal' = respostas estruturadas; 'Descontraído' = emoticons, gírias, leveza",
  saas: "SaaS: Geralmente Técnico ou Consultivo. Ex: 'Deixa eu te mostrar como isso funciona'",
  ecommerce: "E-commerce: Descontraído ou Misto. Ex: 'Bora conferir nossos produtos?'",
  servicos: "Serviços: Formal ou Consultivo. Ex: 'Posso ajudá-lo?'",
  agencia: "Agência: Descontraído ou Criativo. Ex: 'Vamo criar algo incrível junto?'",
  educacao: "Educação: Consultivo ou Descontraído. Ex: 'Vou te guiar nessa jornada'",
  saude: "Saúde: Formal ou Empático. Ex: 'Seu bem-estar é nossa prioridade'",
  real_estate: "Real Estate: Formal ou Consultivo. Ex: 'Encontre o imóvel dos seus sonhos'",
  alimentacao: "Alimentação: Descontraído. Ex: 'Bora pedir algo gostoso?' 🍕",
  varejo: "Varejo: Descontraído ou Amigável. Ex: 'Tá procurando algo específico?'"
};

const personalityOptions = [
  { value: 'inovadora', label: 'Inovadora' },
  { value: 'confiavel', label: 'Confiável' },
  { value: 'criativa', label: 'Criativa' },
  { value: 'acessivel', label: 'Acessível' },
  { value: 'premium', label: 'Premium / Luxury' },
  { value: 'sustentavel', label: 'Sustentável' },
  { value: 'social', label: 'Social / Engajada' },
  { value: 'eficiente', label: 'Eficiente' },
  { value: 'ludica', label: 'Lúdica / Divertida' },
  { value: 'minimalista', label: 'Minimalista' }
];

const WeeMakeForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    company_description: '',
    tone_type: '',
    brand_personality: [],
    core_values: '',
    brand_phrases: '',
    products_list: '',
    main_product: '',
    product_details: '',
    show_prices: null,
    pricing_strategy: '',
    price_ranges: '',
    offers_installments: '',
    target_audience: '',
    integrations: '',
    seasonality: '',
    success_stories: '',
    competitors: '',
    competitive_advantage: '',
    forbidden_topics: '',
    words_to_avoid: '',
    offer_scheduling: null,
    collect_leads: null,
    escalate_human: null,
    response_speed: '',
    scheduling_tool: '',
    scheduling_link: '',
    available_hours: '',
    additional_info: '',
    contact_method: ''
  });
  
  const { 
  isConnected,
  onSave, 
  onAutoSave
  } = useSupabaseBriefing(formData);

  const [showPreview, setShowPreview] = useState(true);
  // Removido: const currentSection = 0; (Não estava sendo utilizado)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 1. Calcula o novo estado primeiro
    const getUpdatedValue = (prev) => {
      if (type === 'checkbox') {
        return checked 
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter(item => item !== value);
      }
      return value;
    };

    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        [name]: getUpdatedValue(prev)
      };
      
      // 2. Chama o auto-save com o dado atualizado
      if (isConnected) {
        onAutoSave(updatedFormData);
      }
      
      return updatedFormData;
    });
  };

  // Envolvido em useCallback para resolver o aviso do exhaustive-deps
  const generateOmnacoes = useCallback(() => {
    let output = '';

    // 1. ROLE DEFINITION (Max 5000 characters)
    let roleDef = `Você é o assistente virtual de pré-vendas da ${formData.company_name || 'Empresa'}, especializada em ${formData.industry ? industries.find(i => i.value === formData.industry)?.label : 'seu segmento'}.\n\n`;
    roleDef += `Objetivo principal: receber novos leads, fazer perguntas curtas para entender os gargalos do cliente (qualificação) e apresentar como as soluções da ${formData.company_name} resolvem.\n\n`;
    roleDef += `${formData.company_description || 'Descrição da empresa não preenchida.'}\n\n`;
    roleDef += `Valores principais: ${formData.core_values || '(não definidos)'}.\n\n`;
    roleDef += `Personalidade: ${formData.brand_personality.length > 0 ? formData.brand_personality.join(', ') : '(não definida)'}`;
    
    output += `═══════════════════════════════════════════════════════════\n`;
    output += `1. ROLE DEFINITION (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += roleDef.substring(0, 5000);
    output += `\n\n[Caracteres: ${roleDef.length}/5000]\n\n`;

    // 2. ABOUT COMPANY, PRODUCTS AND SERVICES (Max 10000 characters)
    let aboutCompany = `${formData.company_name}\n\n`;
    aboutCompany += `Descrição: ${formData.company_description || '(não preenchido)'}\n\n`;
    aboutCompany += `Cliente ideal: ${formData.target_audience || '(não definido)'}.\n\n`;
    aboutCompany += `Produtos e serviços:\n`;
    aboutCompany += formData.products_list ? formData.products_list.split('\n').map(p => `- ${p.trim()}`).join('\n') : '(não preenchido)';
    aboutCompany += `\n\nProduto/Serviço principal: ${formData.main_product || '(não definido)'}.\n\n`;
    if (formData.product_details) {
      aboutCompany += `Detalhes: ${formData.product_details}\n\n`;
    }
    aboutCompany += `Diferenciais competitivos: ${formData.competitive_advantage || '(não definidos)'}.\n\n`;
    if (formData.success_stories) {
      aboutCompany += `Histórias de sucesso: ${formData.success_stories}.\n\n`;
    }
    if (formData.show_prices) {
      aboutCompany += `Estratégia de preço: ${formData.pricing_strategy || '(não definida)'}.\n`;
      if (formData.price_ranges) {
        aboutCompany += `Faixas: ${formData.price_ranges}.\n`;
      }
      if (formData.offers_installments) {
        aboutCompany += `Parcelamento: ${formData.offers_installments}.\n`;
      }
    }

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `2. ABOUT COMPANY, PRODUCTS AND SERVICES (Max 10000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += aboutCompany.substring(0, 10000);
    output += `\n\n[Caracteres: ${aboutCompany.length}/10000]\n\n`;

    // 3. CONVERSATION TONE (Max 5000 characters)
    let conversationTone = `Tom de voz: ${formData.tone_type || '(não definido)'}.\n\n`;
    conversationTone += `Regras inegociáveis de formatação:\n`;
    conversationTone += `- Envie mensagens curtas (máximo 2 ou 3 linhas por mensagem).\n`;
    conversationTone += `- Não envie blocos longos de texto.\n`;
    conversationTone += `- Use linguagem natural do dia a dia, evitando termos excessivamente técnicos.\n`;
    conversationTone += `- Seja humano, consultivo, educado e direto.\n\n`;
    conversationTone += `Descrição do tom:\n`;
    conversationTone += formData.brand_phrases || '(exemplos não preenchidos)';

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `3. CONVERSATION TONE (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += conversationTone.substring(0, 5000);
    output += `\n\n[Caracteres: ${conversationTone.length}/5000]\n\n`;

    // 4. KNOWLEDGE BASE GUIDELINES (Max 5000 characters)
    let kbGuidelines = `Sempre que o lead perguntar detalhes profundos sobre como funciona a metodologia ou o escopo técnico de entrega, consulte os documentos enviados na Base de Conhecimento.\n\n`;
    kbGuidelines += `Use os materiais da Base de Conhecimento para entender os benefícios do ${formData.main_product || 'plano/serviço principal'} e como nossas automações resolvem a dor do "demora no atendimento".\n\n`;
    kbGuidelines += `Priorize as informações da base de conhecimento antes de tentar formular uma resposta genérica.\n\n`;
    if (formData.integrations) {
      kbGuidelines += `Integrações disponíveis: ${formData.integrations}.\n\n`;
    }
    if (formData.seasonality) {
      kbGuidelines += `Sazonalidade: ${formData.seasonality}.\n`;
    }

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `4. KNOWLEDGE BASE GUIDELINES (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += kbGuidelines.substring(0, 5000);
    output += `\n\n[Caracteres: ${kbGuidelines.length}/5000]\n\n`;

    // 5. HALLUCINATION CONTROL (Max 5000 characters)
    let hallucinationControl = `Você tem um limite estrito de conhecimento.\n\n`;
    hallucinationControl += `Nunca invente preços, prazos de entrega, promessas de integrações complexas (como ERPs específicos) ou funcionalidades que não estejam listadas nas suas instruções.\n\n`;
    hallucinationControl += `Se o lead fizer uma pergunta técnica ou comercial que você não sabe responder com absoluta certeza, admita isso e ofereça passar para um humano.\n\n`;
    hallucinationControl += formData.forbidden_topics ? `Tópicos proibidos:\n${formData.forbidden_topics}\n\n` : '';
    hallucinationControl += formData.words_to_avoid ? `Palavras/expressões a evitar:\n${formData.words_to_avoid}` : '';

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `5. HALLUCINATION CONTROL (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += hallucinationControl.substring(0, 5000);
    output += `\n\n[Caracteres: ${hallucinationControl.length}/5000]\n\n`;

    // 6. HUMAN ESCALATION (Max 5000 characters)
    let humanEscalation = `Você deve interromper o atendimento automatizado e passar para um humano IMEDIATAMENTE nestas duas situações:\n\n`;
    humanEscalation += `1. Se o lead solicitar explicitamente ("quero falar com um humano", "atendente", "pessoa real", "me passa para alguém").\n\n`;
    humanEscalation += `2. Se o lead fizer uma pergunta técnica ou comercial que você não sabe responder com absoluta certeza.\n\n`;
    humanEscalation += `Quando precisar transferir, use uma mensagem simples e natural, como: "Entendi, esse é um problema comum. Com a ${formData.company_name}, nós criamos uma IA que responde e qualifica seus clientes em segundos, 24 horas por dia. Deixa eu conectar você com um especialista pra entender melhor sua situação."`;

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `6. HUMAN ESCALATION (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += humanEscalation.substring(0, 5000);
    output += `\n\n[Caracteres: ${humanEscalation.length}/5000]\n\n`;

    // 7. RELEVANT LINKS (Max 5000 characters)
    let relevantLinks = `Importante: Contextualize os links. Não apenas envie URLs — sempre contextualize por que está enviando.\n\n`;
    relevantLinks += `Links relevantes:\n`;
    if (formData.offer_scheduling && formData.scheduling_link) {
      relevantLinks += `- Agendar reunião: ${formData.scheduling_link}\n`;
    }
    relevantLinks += `- Contato direto: ${formData.contact_method || '(não preenchido)'}\n`;
    if (formData.integrations) {
      relevantLinks += `- Documentação: consulte a Base de Conhecimento\n`;
    }

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `7. RELEVANT LINKS (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += relevantLinks.substring(0, 5000);
    output += `\n\n[Caracteres: ${relevantLinks.length}/5000]\n\n`;

    // 8. INTERACTION EXAMPLES (Max 5000 characters)
    let interactionExamples = `**Proactive Interaction Guidelines:**\n\n`;
    interactionExamples += `Seu objetivo não é apenas responder, mas resolver. Evite respostas "secas" ou passivas:\n\n`;
    interactionExamples += `❌ "Temos este plano disponível."\n✅ "Este plano é perfeito para resolver exatamente seu problema de X. Qual é seu maior desafio com Y hoje?"\n\n`;
    interactionExamples += `**Exemplos de interações reais:**\n\n`;
    interactionExamples += `Lead: Olá, vi o anúncio de vocês no Instagram.\n`;
    interactionExamples += `Assistente: Olá! Que bom ter você aqui. Sou ${formData.brand_personality.length > 0 ? formData.brand_personality[0] : 'assistente'} da ${formData.company_name}. Como posso ajudar?\n\n`;
    interactionExamples += `Lead: Qual é o preço?\n`;
    interactionExamples += `Assistente: Entendo! Antes de falar de preço, deixa eu entender seu caso. Qual é seu maior desafio hoje com ${formData.industry || 'seu negócio'}?\n`;

    output += `═══════════════════════════════════════════════════════════\n`;
    output += `8. INTERACTION EXAMPLES (Max 5000 caracteres)\n`;
    output += `═══════════════════════════════════════════════════════════\n\n`;
    output += interactionExamples.substring(0, 5000);
    output += `\n\n[Caracteres: ${interactionExamples.length}/5000]\n\n`;

    return output;
  }, [formData]);

    const omnacoesBriefing = useMemo(() => generateOmnacoes(), [generateOmnacoes]);
    const exportBriefing = async () => {
      
      const result = await onSave(formData);
        if (!result.success) {
          console.warn('⚠️ Falha ao salvar, mas continuando com export');
        }
    const element = document.createElement('a');
    const file = new Blob([omnacoesBriefing], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `briefing-omnacoes-${formData.company_name || 'empresa'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Briefing Parametrizado</h1>
          <p className="text-gray-600">Crie um perfil completo da sua empresa para seu chatbot WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Seção 1: Identidade */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📋</span> Identidade da Empresa
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da empresa *</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="Ex: Tech Solutions Brasil"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Como sua empresa é conhecida no mercado?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Segmento/Indústria *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Selecione...</option>
                      {industries.map(ind => (
                        <option key={ind.value} value={ind.value}>{ind.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Isso ajuda a mostrar exemplos relevantes</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição breve do negócio *</label>
                    <textarea
                      name="company_description"
                      value={formData.company_description}
                      onChange={handleInputChange}
                      placeholder="Ex: Oferecemos soluções de automação para pequenas e médias empresas..."
                      maxLength="300"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.company_description.length}/300 caracteres</p>
                  </div>
                </div>
              </div>

              {/* Seção 2: Tom de Voz */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#EC4899' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎙️</span> Tom de Voz & Valores
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tom principal *</label>
                    <select
                      name="tone_type"
                      value={formData.tone_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="formal">Formal / Profissional</option>
                      <option value="descontraido">Descontraído / Amigável</option>
                      <option value="tecnico">Técnico / Especialista</option>
                      <option value="consultivo">Consultivo / Educador</option>
                      <option value="misto">Misto</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2 p-2 bg-purple-50 rounded">
                      💡 {toneExamples[formData.industry] || toneExamples.generic}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Personalidade da marca (até 5) *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {personalityOptions.map(opt => (
                        <label key={opt.value} className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                          <input
                            type="checkbox"
                            name="brand_personality"
                            value={opt.value}
                            checked={formData.brand_personality.includes(opt.value)}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-purple-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Valores principais *</label>
                    <textarea
                      name="core_values"
                      value={formData.core_values}
                      onChange={handleInputChange}
                      placeholder="Ex: Transparência, Inovação, Atendimento ao cliente (separe por vírgula)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Frases que representam sua marca</label>
                    <textarea
                      name="brand_phrases"
                      value={formData.brand_phrases}
                      onChange={handleInputChange}
                      placeholder="Ex: 'Bora transformar ideias em realidade' / 'Sua confiança é nossa missão'"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Produtos */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🛍️</span> Produtos & Serviços
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lista de produtos/serviços *</label>
                    <textarea
                      name="products_list"
                      value={formData.products_list}
                      onChange={handleInputChange}
                      placeholder="Ex: Plano Starter ($99/mês)&#10;Plano Pro ($299/mês)&#10;Consultoria personalizada"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Produto/serviço estrela *</label>
                    <input
                      type="text"
                      name="main_product"
                      value={formData.main_product}
                      onChange={handleInputChange}
                      placeholder="Ex: Plano Pro"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Detalhes importantes</label>
                    <textarea
                      name="product_details"
                      value={formData.product_details}
                      onChange={handleInputChange}
                      placeholder="Ex: Plano Starter: ideal para freelancers, até 50 usuários, suporte por email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 4: Pricing (condicional) */}
              {formData.show_prices === true && (
                // Propriedades style duplicadas combinadas em um único objeto!
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#EC4899', animation: 'fadeIn 0.3s ease-in' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💰</span> Pricing & Orçamentos
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Como você trabalha com preços?</label>
                      <select
                        name="pricing_strategy"
                        value={formData.pricing_strategy}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="tabela_fixa">Tabela fixa e pública</option>
                        <option value="customizado">Customizado por demanda</option>
                        <option value="misto">Base + customização</option>
                        <option value="sob_demanda">Sempre sob demanda</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Faixas de preço</label>
                      <textarea
                        name="price_ranges"
                        value={formData.price_ranges}
                        onChange={handleInputChange}
                        placeholder="Ex: Starter: R$ 99-199 / Pro: R$ 299-499 / Enterprise: 2.000+"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Oferece parcelamento?</label>
                      <select
                        name="offers_installments"
                        value={formData.offers_installments}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                        <option value="parcialmente">Apenas em alguns casos</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Seção 5: Conhecimentos */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🧠</span> Conhecimentos Específicos
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quem é seu cliente ideal? *</label>
                    <textarea
                      name="target_audience"
                      value={formData.target_audience}
                      onChange={handleInputChange}
                      placeholder="Ex: Pequenas e médias empresas com até 50 funcionários, segmento tecnológico"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Integrações que você usa</label>
                    <textarea
                      name="integrations"
                      value={formData.integrations}
                      onChange={handleInputChange}
                      placeholder="Ex: Stripe, Zapier, Google Sheets, Asana"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sazonalidade / Padrões de demanda</label>
                    <textarea
                      name="seasonality"
                      value={formData.seasonality}
                      onChange={handleInputChange}
                      placeholder="Ex: Maior procura em janeiro (New Year resolutions), Black Friday é pico"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Histórias de sucesso (opcional)</label>
                    <textarea
                      name="success_stories"
                      value={formData.success_stories}
                      onChange={handleInputChange}
                      placeholder="Ex: Cliente X aumentou produtividade em 40% em 3 meses"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 6: Restrições */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#EC4899' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">⚡</span> Concorrência & Restrições
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Principais concorrentes</label>
                    <textarea
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleInputChange}
                      placeholder="Ex: Empresa X, Empresa Y, solução open-source Z"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Seu diferencial competitivo *</label>
                    <textarea
                      name="competitive_advantage"
                      value={formData.competitive_advantage}
                      onChange={handleInputChange}
                      placeholder="Ex: Suporte 24/7 em português, Integração nativa com Shopify"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tópicos que o chatbot NÃO deve abordar</label>
                    <textarea
                      name="forbidden_topics"
                      value={formData.forbidden_topics}
                      onChange={handleInputChange}
                      placeholder="Ex: Não falar de promoções que acabaram, não citar status sem rastrear"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Palavras/expressões a evitar</label>
                    <textarea
                      name="words_to_avoid"
                      value={formData.words_to_avoid}
                      onChange={handleInputChange}
                      placeholder="Ex: 'caro', 'concorrente X', 'beta', 'em breve', 'talvez'"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 7: Config Chatbot */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🤖</span> Configuração do Chatbot
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">O chatbot deve mostrar preços automaticamente? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="show_prices"
                          value={true}
                          checked={formData.show_prices === true}
                          onChange={(e) => setFormData({...formData, show_prices: true})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Sim, mostre os preços</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="show_prices"
                          value={false}
                          checked={formData.show_prices === false}
                          onChange={(e) => setFormData({...formData, show_prices: false})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Não, peça para entrar em contato</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Oferecer agendamento? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="offer_scheduling"
                          value={true}
                          checked={formData.offer_scheduling === true}
                          onChange={(e) => setFormData({...formData, offer_scheduling: true})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Sim, integrar calendário</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="offer_scheduling"
                          value={false}
                          checked={formData.offer_scheduling === false}
                          onChange={(e) => setFormData({...formData, offer_scheduling: false})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Não, apenas pedir e-mail/telefone</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Coletar dados de leads? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="collect_leads"
                          value={true}
                          checked={formData.collect_leads === true}
                          onChange={(e) => setFormData({...formData, collect_leads: true})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Sim, sempre coletar</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="collect_leads"
                          value={false}
                          checked={formData.collect_leads === false}
                          onChange={(e) => setFormData({...formData, collect_leads: false})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Não, apenas responder dúvidas</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Escalar para humano? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="escalate_human"
                          value={true}
                          checked={formData.escalate_human === true}
                          onChange={(e) => setFormData({...formData, escalate_human: true})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Sim, oferecer conversa com humano</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50">
                        <input
                          type="radio"
                          name="escalate_human"
                          value={false}
                          checked={formData.escalate_human === false}
                          onChange={(e) => setFormData({...formData, escalate_human: false})}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Não, o chatbot resolve tudo</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Velocidade de resposta *</label>
                    <select
                      name="response_speed"
                      value={formData.response_speed}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="instant">Instantânea (automática)</option>
                      <option value="quick">Rápida (minutos)</option>
                      <option value="business_hours">Horário comercial</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seção 8: Agendamento (condicional) */}
              {formData.offer_scheduling === true && (
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#EC4899' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📅</span> Preferências de Agendamento
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ferramenta de agendamento *</label>
                      <select
                        name="scheduling_tool"
                        value={formData.scheduling_tool}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="calendly">Calendly</option>
                        <option value="google_calendar">Google Calendar</option>
                        <option value="typeform">Typeform / Formulário</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Link para agendamento *</label>
                      <input
                        type="text"
                        name="scheduling_link"
                        value={formData.scheduling_link}
                        onChange={handleInputChange}
                        placeholder="Ex: https://calendly.com/seu-nome"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Horários disponíveis *</label>
                      <input
                        type="text"
                        name="available_hours"
                        value={formData.available_hours}
                        onChange={handleInputChange}
                        placeholder="Ex: Segunda a sexta, 9h às 18h (horário de Brasília)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Seção 9: Info Adicional */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✨</span> Informações Adicionais
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Algo mais que o chatbot deve saber?</label>
                    <textarea
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleInputChange}
                      placeholder="Ex: Fazemos entregas apenas SP/RJ, Suportamos 5 idiomas, Garantia de 30 dias"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Melhor forma de contato *</label>
                    <textarea
                      name="contact_method"
                      value={formData.contact_method}
                      onChange={handleInputChange}
                      placeholder="Ex: Email: contato@empresa.com | WhatsApp: (11) 99999-9999"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Botão Exportar */}
              <button
                onClick={exportBriefing}
                className="w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                style={{ backgroundColor: '#7C3AED' }}
              >
                <Download size={20} />
                Exportar para Omnacoes
              </button>
            </div>
          </div>

          {/* Preview Omnacoes */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Eye size={18} />
                    Preview dos 8 Blocos
                  </h3>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-white hover:bg-white/20 p-1 rounded"
                  >
                    {showPreview ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {showPreview && (
                  <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <pre className="text-xs whitespace-pre-wrap break-words font-mono text-gray-700 leading-relaxed">
                      {omnacoesBriefing}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WeeMakeForm;
