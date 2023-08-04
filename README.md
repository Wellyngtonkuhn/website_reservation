# Fluxo de Pagamento

1- Fazer Requisição para a rota de pagamento que estará conectada ao Stripe.
"POST/api/payment"
_ Essa rota irá conversar com o Stripe.
_ O Stripe retornará o sessionID e totalPrice.
\_ Redirecionará para o Checkout após autorizado.

2 - Status do Pagamento
\_ Deu Certo

- Usar o Webhook. Quanto o Stripe detectar o pagamento irá chamar a nossa API para assim confirmar a reserva.
- "/api/payment/confirmation" irá criar a reserva e redirecionar para a página de sucesso.

  \_ Não deu Certo

  ## Todo

[] Arumar o fetch do QuickSearch component da home.
[] Fazer as mutations do React query com cache para os eventos.
[] Fazer o component de Loading.
[] Fazer a tratativas de erros das requests para o usuário.