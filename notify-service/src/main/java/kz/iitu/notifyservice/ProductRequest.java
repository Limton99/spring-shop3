package kz.iitu.notifyservice;

public class ProductRequest {
    private String userId;
    private Product product;

    public ProductRequest() {
    }

    public ProductRequest(String userId, Product product) {
        this.userId = userId;
        this.product = product;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "ProductRequest{" +
                "userId='" + userId + '\'' +
                ", product=" + product +
                '}';
    }
}
