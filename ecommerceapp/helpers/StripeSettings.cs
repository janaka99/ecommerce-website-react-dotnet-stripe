namespace ecommerceapp.helpers
{
    public class StripeSettings
    {
        public required string SecretKey { get; set; }
        public required string WebhookSecretKey { get; set; }
        public required string PublishableKey { get; set; }
    }
}
