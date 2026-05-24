export type money_bk = {
    id: string
    user_id: string
    type: 'income' | 'expense'
    title: string
    amount: number
    transaction_date: string
    created_at: string
}
