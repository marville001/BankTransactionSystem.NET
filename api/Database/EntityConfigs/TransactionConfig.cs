using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.EntityConfigs;

public class TransactionConfig:IEntityTypeConfiguration<TransactionEntity>
{
    public void Configure(EntityTypeBuilder<TransactionEntity> builder)
    {
        builder.ToTable("Transactions");
        builder.Property(acc => acc.TransactionId)
            .ValueGeneratedOnAdd();
        
        builder.HasOne<AccountEntity>(rl => rl.AccountEntity)
            .WithMany()
            .HasForeignKey(acc => acc.AccountId);
        builder.HasOne<AtmEntity>(rl => rl.AtmEntity)
            .WithMany()
            .HasForeignKey(acc => acc.AtmId);
    }
}