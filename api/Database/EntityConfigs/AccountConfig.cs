using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.EntityConfigs;

public class AccountConfig:IEntityTypeConfiguration<AccountEntity>
{
    public void Configure(EntityTypeBuilder<AccountEntity> builder)
    {
        builder.ToTable("Accounts");
        builder.Property(acc => acc.AccountId)
            .ValueGeneratedOnAdd();
        builder.HasOne<UserEntity>(rl => rl.UserEntity)
            .WithMany()
            .HasForeignKey(acc => acc.UserId);
    }
}